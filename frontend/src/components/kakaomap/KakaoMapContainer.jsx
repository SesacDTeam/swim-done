import React, { useEffect, useRef } from 'react';
import seoulGu from '../../utils/seoul-gu.json';
import { kickPan } from '../../utils/staticImagePath';
import kakaoMapApi from '../../api/kakaoMapApi';

//#region 지도 기본 설정
const center = new kakao.maps.LatLng(37.5666454, 126.9781553); // 서울 시민청 좌표 (기본 중심점)
const options = { center, level: 9 }; // 확대 레벨

let map = null;
const polygons = [];
const markers = [];
const infoWindow = new kakao.maps.InfoWindow({ removable: true });
const markerImageSize = { imageWidth: 20, imageHeight: 30 };
const customOverlay = new kakao.maps.CustomOverlay({});
//#endregion 지도 기본 설정

//#region Map
/**
 * @description
 * - 지도 생성 함수
 * - strict mode는 지도가 2개 생성되어 확대, 축소 시 잔상남음
 * @param {HTMLElement} mapContainer - 지도 컨테이너 요소
 * @returns {kakao.maps.Map} 생성된 지도 객체
 */
function createMap(mapContainer) {
  if (map) return; // 지도 중복생성 방지
  const newMap = new kakao.maps.Map(mapContainer, options);
  createZoomControl(newMap);
  map = newMap;
  kakao.maps.event.addListener(newMap, 'click', () => infoWindow.close());
  kakao.maps.event.addListener(newMap, 'zoom_changed', () => togglePolygons(newMap.getLevel() > 8));
}

/**
 * @function createZoomControl
 * @description 줌 컨트롤 추가
 * @param {Object} map - 지도 객체
 */
function createZoomControl(map) {
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
}
//#endregion Map

//#region Marker
/**
 * @description 지도 위에 마커 생성
 * @param {kakao.maps.LatLng} position - 마커 위치 (LatLng 객체)
 * @param {kakao.maps.MarkerImage} image - 마커 이미지 객체
 * @param {string} title - 마커 타이틀
 * @returns {kakao.maps.Marker} 생성된 마커 객체
 */
function createMarker(position, image, title) {
  return new kakao.maps.Marker({
    map,
    position,
    image,
    clickable: true,
    title,
  });
}

/**
 * @description 마커 이미지 생성
 * @param {string} image - 마커 이미지 URL
 * @param {Object} imageSize - 이미지 크기 설정 객체 { imageWidth, imageHeight }
 * @returns {kakao.maps.MarkerImage} 생성된 마커 이미지 객체
 */
function createMarkerImage(image, imageSize) {
  const { imageWidth, imageHeight } = imageSize;
  const markerSize = new kakao.maps.Size(imageWidth, imageHeight);
  return new kakao.maps.MarkerImage(image, markerSize);
}

/**
 * @description 마커 이벤트 핸들러
 * @param {kakao.maps.Marker} marker - 마커 객체
 */
function markerClickHandler(marker) {
  kakao.maps.event.addListener(marker, 'click', async () => await updateInfoWindow(marker));
}
//#endregion Marker

//#region InfoWindow
/**
 * @description
 * 인포윈도우 업데이트
 * @param {kakao.maps.Marker} marker - 마커 객체
 */
async function updateInfoWindow(marker) {
  const newContent = await drawInfoWindowContent(marker.getTitle());

  infoWindow.setContent(newContent);
  infoWindow.open(marker.getMap(), marker);
}

/**
 * @description
 * 인포윈도우 컨텐츠 생성
 * @param {string} poolName - 수영장 이름
 * @returns {Promise} 인포윈도우 컨텐츠
 */
async function drawInfoWindowContent(poolName) {
  const response = await kakaoMapApi.getPool(poolName);

  try {
    const pool = response.data;

    const swimmingTimes = pool.swimmingTimes
      .map(({ startTime, endTime }) => `<p>${startTime} ~ ${endTime}</p>`)
      .join(',');
    const content = swimmingTimes
      ? `
        <p class="mb-2">${pool.dayOfWeek} 자유 수영 시간</p>
        ${swimmingTimes}
      `
      : `<p class="mb-2">${pool.dayOfWeek} 자유 수영 시간이 없습니다.</p>`;
    return (
      <div class="bg-white shadow-lg rounded-lg p-4 w-[337px] border border-gray-200">
        <h2 class="text-xl font-bold text-black">${poolName}</h2>
        <p class="text-gray-600 text-sm">${pool.address}</p>
        <div class="mt-2 text-sm text-gray-800">${content}</div>
        <p class="mt-2 text-xs text-blue-500 cursor-pointer hover:underline">
          * 다른 요일이 궁금하다면?
          <br />
          클릭 후 더 자세히 확인할 수 있어요!
        </p>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

//#endregion InfoWindow

//#region Polygon

const displayArea = (coordinates, name) => {
  // 폴리곤 좌표 모음
  const path = [];

  coordinates.forEach((coordinate) => {
    path.push(createPoint(coordinate[1], coordinate[0]));
  });

  const polygon = new kakao.maps.Polygon({
    map,
    path,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#ffffff',
    fillOpacity: 0.7,
  });
  polygons.push(polygon); // 관리 배열에 추가

  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    polygon.setOptions({ fillColor: '#09f' });

    customOverlay.setContent(`
        <div class="absolute bg-white border border-gray-500 rounded-sm text-xs top-[-5px] left-[15px] p-[2px]">
          ${name}
        </div>
      `);

    customOverlay.setPosition(mouseEvent.latLng);
    customOverlay.setMap(map);
  });

  // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
  kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
    customOverlay.setPosition(mouseEvent.latLng);
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  // 커스텀 오버레이를 지도에서 제거합니다
  kakao.maps.event.addListener(polygon, 'mouseout', () => {
    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
  kakao.maps.event.addListener(polygon, 'click', async (mouseEvent) => {
    // 폴리곤 색상 원복
    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
    // 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    // 지도 확대
    map.setLevel(7);
    map.panTo(mouseEvent.latLng);
    // 수영장 마커 생성
    const response = await kakaoMapApi.getSectionWithPools(name);
    const pools = response.data;
    pools.forEach(({ latitude, longitude, name }) => {
      const marker = createMarker(
        createPoint(latitude, longitude),
        createMarkerImage(kickPan, markerImageSize),
        name,
      );
      markers.push(marker);
      markerClickHandler(marker);
    });
    // 리스트바 업데이트
  });
};

/**
 * @function drawPolygons
 * @description 다각형 그리기
 * @param {Array} data - 다각형 데이터(좌표, 이름)
 */
function drawPolygons(data) {
  data.forEach(({ coordinates, SIG_KOR_NM }) => {
    displayArea(coordinates, SIG_KOR_NM);
  });
}

/** @description 폴리곤 토글 */
function togglePolygons(display) {
  polygons.forEach((polygon) => polygon.setMap(display ? map : null));
}

//#endregion Polygon

//#region Util
/**
 * @function createPoint
 * @description 좌표 객체 생성
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @returns {kakao.maps.LatLng} LatLng 객체
 */
function createPoint(latitude, longitude) {
  return new kakao.maps.LatLng(latitude, longitude);
}

/**
 * @function initCenterHandler
 * @description 지도 중심을 기본 위치로 초기화
 */
function initCenterHandler() {
  map.setLevel(level);
  map.panTo(center);
  markers.forEach((marker) => marker.setMap(null));
}
//#endregion Util

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);

  useEffect(() => {
    // 지도 및 지역구 폴리곤 생성
    try {
      if (kakao && kakao.maps) {
        createMap(mapContainer.current);
        drawPolygons(seoulGu);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </>
  );
}
