import React, { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; // React 컴포넌트를 HTML 문자열로 변환
import seoulGu from '../../utils/seoul-gu.json';
import { kickPan } from '../../utils/staticImagePath';
import kakaoMapApi from '../../api/kakaoMapApi';
import InfoWindowContent from '../poollist/InfoWindowContent';
import { useDispatch } from 'react-redux';
import {
  setMap,
  updateMarkers,
  setInfoWindow,
  setPools,
  setName,
} from '../../store/slices/kakaoMapSlice.js';
import { useNavigate } from 'react-router';
import { showListBar } from '../../store/slices/listBarSlice.js';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //#region 지도 기본 설정
  const center = new kakao.maps.LatLng(37.5666454, 126.9781553); // 서울 시민청 좌표 (기본 중심점)
  const options = { center, level: 9 }; // 확대 레벨

  let map = null;
  const polygons = [];
  const markers = [];
  const infoWindow = new kakao.maps.InfoWindow({ removable: true });
  dispatch(setInfoWindow({ infoWindow })); // 인포윈도우 리덕스에 보관, 지도에서 삭제 때 사용
  const customOverlay = new kakao.maps.CustomOverlay({});
  const markerImageSize = new kakao.maps.Size(20, 30);
  //#endregion 지도 기본 설정

  //#region Map 생성
  /**
   * @description
   * - 지도 생성 함수
   * @param {HTMLElement} mapContainer - 지도 컨테이너 요소
   * @returns {kakao.maps.Map} 생성된 지도 객체
   */
  function createMap(mapContainer) {
    map = new kakao.maps.Map(mapContainer, options);
    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    map.setMaxLevel(9);

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
    return marker;
  }

  //#endregion

  //#region InfoWindow

  /**
   * @description 인포윈도우 콘텐츠를 생성하는 함수 (React 컴포넌트를 HTML 문자열로 변환)
   * @param {string} poolName - 수영장 이름
   * @returns {Promise} 인포윈도우 콘텐츠 HTML 문자열
   */
  async function drawInfoWindowContent(poolName) {
    try {
      const { data: pool } = await kakaoMapApi.getPool(poolName);
      const swimmingTimes = pool.swimmingTimes
        .map(({ startTime, endTime }) => `<p>${startTime} ~ ${endTime}</p>`)
        .join('') || <p className="mb-2">자유 수영 시간이 없습니다.</p>;

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
      return <p className="text-red-500">정보를 불러오는 데 실패했습니다.</p>;
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

    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', (e) => {
      polygon.setOptions({ fillColor: '#09f' });
      customOverlay.setContent(
        `<div class="absolute bg-white border border-gray-500 rounded-sm text-xs top-[-5px] left-[15px] p-[2px]">
        ${name}
      </div>`,
      );
      customOverlay.setPosition(e.latLng);
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

    kakao.maps.event.addListener(polygon, 'click', async (e) => {
      map.setLevel(7);
      map.panTo(e.latLng);
      markers.forEach((marker) => marker.setMap(null));
      customOverlay.setMap(null);
      polygon.setOptions({ fillColor: '#fff' });
      try {
        const { data: pools } = await kakaoMapApi.getSectionWithPools(name);

        const markers = pools.map(({ latitude, longitude, name }) =>
          createMarker(new kakao.maps.LatLng(latitude, longitude), name),
        );
        // 마커 화면에서 제거에 활용
        dispatch(updateMarkers({ markers }));
        // 지역별 수영장 정보
        dispatch(setPools({ pools }));
        dispatch(setName({ name }))
        navigate('pools');
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

  useEffect(() => {
    if (kakao && kakao.maps) {
      dispatch(setMap({ map: createMap(mapContainer.current) }));
      drawPolygons(seoulGu);
    }
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}
