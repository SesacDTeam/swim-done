import { kickPan } from '../../utils/staticImagePath';
import { kakaoMapApi } from '../../api/kakaoMapApi';

const response = await kakaoMapApi.getSections();
const points = response.data;
console.log(points);

export let map = null;

/** @description 인포윈도우 */
const infowindow = new kakao.maps.InfoWindow({
  map,
  position: null,
  content: null,
});

/**
 * @description 서울 시민청 좌표 (기본 중심점)
 */
const centerLat = 37.5666454;
const centerLng = 126.9781553;

/**
 * @description 지도 기본 중심 좌표 객체 생성
 */
const center = new kakao.maps.LatLng(centerLat, centerLng);

/**
 * @description 지도 기본 확대 레벨
 */
const level = 9;

/**
 * @description 지도 기본 옵션
 */
const options = {
  center,
  level,
};

/**
 * @description 마커 크기 설정
 */
const markerImageSize = { imageWidth: 20, imageHeight: 30 };

/**
 * @function createMap
 * @description 지도 생성 함수
 * @param {HTMLElement} mapContainer - 지도 컨테이너 요소
 * @returns {Object} 생성된 지도 객체
 */
export function createMap(mapContainer) {
  const newMap = new kakao.maps.Map(mapContainer, options);
  createZoomControl(newMap);
  clustererHandler(points, newMap);
  map = newMap;
  return map;
}

/**
 * @function createPoint
 * @description 마커 좌표 객체 생성
 * @param {number} latitude - 위도
 * @param {number} longitude - 경도
 * @returns {Object} LatLng 객체
 */
function createPoint(latitude, longitude) {
  return new kakao.maps.LatLng(latitude, longitude);
}

/**
 * @function createMarker
 * @description 지도 위에 마커를 생성
 * @param {Object} position - 마커 위치 (LatLng 객체)
 * @param {Object} image - 마커 이미지 객체
 * @param {Object} [map=null] - 마커를 추가할 지도 객체 (기본값: null)
 * @returns {Object} 생성된 마커 객체
 */
function createMarker(position, image, map = null) {
  return new kakao.maps.Marker({
    position,
    image,
    map,
  });
}

/**
 * @function createMarkerVer2
 * @description 지도 위에 마커를 생성 클러스터 전영, Marker에 대한 map을 지정안함
 * @param {Object} position - 마커 위치 (LatLng 객체)
 * @param {Object} image - 마커 이미지 객체
 * @returns {Object} 생성된 마커 객체
 */
function createMarkerVer2(position, image) {
  const isClickable = true;
  return new kakao.maps.Marker({
    position,
    image,
    clickable: isClickable,
  });
}

/**
 * @function createMarkerImage
 * @description 마커 이미지 생성
 * @param {string} image - 마커 이미지 URL
 * @param {Object} imageSize - 이미지 크기 설정 객체 { imageWidth, imageHeight }
 * @returns {Object} 생성된 마커 이미지 객체
 */
function createMarkerImage(image, imageSize) {
  const { imageWidth, imageHeight } = imageSize;
  const markerSize = new kakao.maps.Size(imageWidth, imageHeight);
  return new kakao.maps.MarkerImage(image, markerSize);
}

/**
 * @function createInfoWindow
 * @description 마커에 연결할 정보창(InfoWindow) 생성
 * @param {Object} map - 지도 객체
 * @param {Object} marker - 마커 객체
 * @param {Object} point - 마커의 데이터 (name, latitude, longitude 등)
 */
function createInfoWindow(map, marker, point) {
  const infoWindow = new kakao.maps.InfoWindow({
    content: `
      <div style='height:100px;'>
        <div>${point.name}</div>
        <hr/>
        <div>주차가능</div>
      </div>
    `,
  });

  kakao.maps.event.addListener(marker, 'mouseover', () => infoWindow.open(map, marker));
  kakao.maps.event.addListener(marker, 'mouseout', () => infoWindow.close());
}

function createInfoWindowVer2(map, marker, point) {
  const infoWindow = new kakao.maps.InfoWindow({
    content: `
      <div style='height:100px;'>
        <div>${point.name}</div>
        <hr/>
        <div>주차가능</div>
      </div>
    `,
  });

  kakao.maps.event.addListener(marker, 'mouseover', () => infoWindow.open(map, marker));
  kakao.maps.event.addListener(marker, 'mouseout', () => infoWindow.close());
}

/**
 * @deprecated 클러스터 활용으로 사용되지 않는 함수
 * @function addMarkers
 * @description 개별 마커를 지도에 추가하는 함수
 * @param {Array} points - 마커를 추가할 좌표 리스트
 * @param {Object} map - 지도 객체
 */
function addMarkers(points, map) {
  points.forEach((point) => {
    const position = createPoint(point.latitude, point.longitude);
    const markerImage = createMarkerImage(kickPan, markerImageSize);
    const marker = createMarker(position, markerImage, map);
    createInfoWindow(map, marker, point);
  });
}

/**
 * @function clustererHandler
 * @description 마커들을 클러스터링하는 함수
 * @param {Array} points - 마커를 추가할 좌표 리스트
 * @param {Object} map - 지도 객체
 */
function clustererHandler(points, map) {
  const filteredPoints = {};

  points.forEach((point) => {
    const { section } = point;
    if (!filteredPoints[section]) {
      filteredPoints[section] = [];
    }
    filteredPoints[section].push(point);
  });

  const clusterer = new kakao.maps.MarkerClusterer({
    map,
    minLevel: 8,
    minClusterSize: 2,
  });

  // Object.keys(filteredPoints).forEach((key) => {
  //   const image = createMarkerImage(kickPan, markerImageSize);
  //   const markers = filteredPoints[key].map((p) => {
  //     const marker = createMarker(createPoint(p.latitude, p.longitude), image);
  //     createInfoWindow(map, marker, p);
  //     return marker;
  //   });
  //   clusterer.addMarkers(markers);
  // });

  Object.keys(filteredPoints).forEach((key) => {
    const image = createMarkerImage(kickPan, markerImageSize);
    const markers = filteredPoints[key].map((p) => {
      const marker = createMarkerVer2(createPoint(p.latitude, p.longitude), image);
      createInfoWindowVer2(map, marker, p);
      return marker;
    });
    clusterer.addMarkers(markers);
  });
}
function updateInfoWindow() {
  kakao.maps.event.addListener(marker, 'click', () => {
    infowindow.setContent(content);
    infowindow.setPosition(createPoint(latitude, longitude));
  });
}

/**
 * @function initCenterHandler
 * @description 지도 중심을 기본 위치로 초기화
 * @param {Object} map - 지도 객체
 */
export function initCenterHandler(map) {
  map.setLevel(level);
  map.panTo(center);
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
