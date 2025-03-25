import React, { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; // React 컴포넌트를 HTML 문자열로 변환
import seoulGu from '../../utils/seoul-gu.json';
import { kickPan } from '../../utils/staticImagePath';
import kakaoMapApi from '../../api/kakaoMapApi';
import InfoWindowContent from '../poollist/InfoWindowContent';
import { useDispatch } from 'react-redux';
import { setMap } from '../../store/slices/kakaoMapSlice.js';
//#region 지도 기본 설정
const center = new kakao.maps.LatLng(37.5666454, 126.9781553); // 서울 시민청 좌표 (기본 중심점)
const options = { center, level: 9 }; // 확대 레벨

let map = null;
const polygons = [];
const markers = [];
const infoWindow = new kakao.maps.InfoWindow({ removable: true });
const customOverlay = new kakao.maps.CustomOverlay({});
const markerImageSize = new kakao.maps.Size(20, 30);
//#endregion 지도 기본 설정

//#region Map 생성
/**
 * @description
 * - 지도 생성 함수
 * - strict mode는 지도가 2개 생성되어 확대, 축소 시 잔상남음
 * @param {HTMLElement} mapContainer - 지도 컨테이너 요소
 * @returns {kakao.maps.Map} 생성된 지도 객체
 */
function createMap(mapContainer) {
  if (map) return; // 지도 중복생성 방지
  map = new kakao.maps.Map(mapContainer, options);
  map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

  kakao.maps.event.addListener(map, 'click', () => infoWindow.close());
  kakao.maps.event.addListener(map, 'zoom_changed', () => togglePolygons(map.getLevel() > 8));
  return map;
}
//#endregion

//#region Marker

/**
 * @description 지도 위에 마커 생성
 * @param {kakao.maps.LatLng} position - 마커 위치 (LatLng 객체)
 * @param {string} title - 마커 타이틀
 * @returns {kakao.maps.Marker} 생성된 마커 객체
 */
function createMarker(position, title) {
  const marker = new kakao.maps.Marker({
    map,
    position,
    image: new kakao.maps.MarkerImage(kickPan, markerImageSize),
    clickable: true,
    title,
  });
  kakao.maps.event.addListener(marker, 'click', () => updateInfoWindow(marker));
  markers.push(marker);
}

//#endregion

//#region InfoWindow

/**
 * @description 인포윈도우 콘텐츠를 생성하는 함수 (React 컴포넌트를 HTML 문자열로 변환)
 * @param {string} poolName - 수영장 이름
 * @returns {Promise<string>} 인포윈도우 콘텐츠 HTML 문자열
 */
async function drawInfoWindowContent(poolName) {
  try {
    const { data: pool } = await kakaoMapApi.getPool(poolName);
    const swimmingTimes =
      pool.swimmingTimes
        .map(({ startTime, endTime }) => `<p>${startTime} ~ ${endTime}</p>`)
        .join('') || '<p class="mb-2">자유 수영 시간이 없습니다.</p>';

    // React 컴포넌트를 HTML 문자열로 변환하여 반환
    return renderToStaticMarkup(
      <InfoWindowContent
        poolName={poolName}
        address={pool.address}
        swimmingTimes={swimmingTimes}
      />,
    );
  } catch (error) {
    console.error(error);
    return '<p class="text-red-500">정보를 불러오는 데 실패했습니다.</p>';
  }
}

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
//#endregion

//#region Polygon
/**
 * @description 폴리곤 출력
 * @param {Array} coordinates - 좌표 배열
 * @param {string} name - 지역명
 */
function displayArea(coordinates, name) {
  const path = coordinates.map(([lng, lat]) => new kakao.maps.LatLng(lat, lng));
  const polygon = new kakao.maps.Polygon({
    map,
    path,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#ffffff',
    fillOpacity: 0.7,
  });
  polygons.push(polygon);

  kakao.maps.event.addListener(polygon, 'mouseover', (e) => {
    polygon.setOptions({ fillColor: '#09f' });
    customOverlay.setContent(
      `<div class="absolute bg-white border border-gray-500 rounded-sm text-xs p-[2px]">${name}</div>`,
    );
    customOverlay.setPosition(e.latLng);
    customOverlay.setMap(map);
  });

  kakao.maps.event.addListener(polygon, 'mouseout', () => {
    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
  });

  kakao.maps.event.addListener(polygon, 'click', async (e) => {
    map.setLevel(7);
    map.panTo(e.latLng);
    markers.forEach((marker) => marker.setMap(null));
    customOverlay.setMap(null);

    try {
      const { data: pools } = await kakaoMapApi.getSectionWithPools(name);
      pools.map(({ latitude, longitude, name }) =>
        createMarker(new kakao.maps.LatLng(latitude, longitude), name),
      );
    } catch (error) {
      console.error(error);
    }
  });
}

function drawPolygons(data) {
  data.forEach(({ coordinates, SIG_KOR_NM }) => displayArea(coordinates, SIG_KOR_NM));
}

/** @description 폴리곤 토글 */
function togglePolygons(display) {
  polygons.forEach((polygon) => polygon.setMap(display ? map : null));
}
//#endregion

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (kakao && kakao.maps) {
      dispatch(setMap(createMap(mapContainer.current)));
      drawPolygons(seoulGu);
    }
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}
