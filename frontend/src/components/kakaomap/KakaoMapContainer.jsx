import React, { useEffect, useRef, useState } from 'react';
import seoulGu from '../../utils/seoul-gu.json';
import { kickPan } from '../../utils/staticImagePath';
import kakaoMapApi from '../../api/kakaoMapApi';
import { useDispatch } from 'react-redux';
import {
  setMap,
  updateMarkers,
  setPools,
  setName,
  setInfoWindow,
} from '../../store/slices/kakaoMapSlice.js';
import { useNavigate } from 'react-router';
import InfoWindowContentPortal from '../poollist/InfoWindowContentPortal.jsx';
import ERROR_CODE from '../../error/ERROR_CODE';
import RequestError from '../../error/RequestError';
import ERROR_DISPLAY_MODE from '../../error/ERROR_DISPLAY_MODE';
import useErrorResolver from '../../hooks/useErrorResolver.jsx';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);

  const [selectedPool, setSelectedPool] = useState(null); // 선택된 수영장 데이터
  const [infoWindowContainer, setInfoWindowContainer] = useState(null); // 인포윈도우 컨테이너

  const { setError } = useErrorResolver(ERROR_DISPLAY_MODE.TOAST);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
   * @param {HTMLElement} mapContainer - 지도 컨테이너 요소
   * @returns {kakao.maps.Map} 생성된 지도 객체
   */
  function createMap(mapContainer) {
    try {
      map = new kakao.maps.Map(mapContainer, options);
      map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
      map.setMaxLevel(9);

      kakao.maps.event.addListener(map, 'click', () => infoWindow.close());
      kakao.maps.event.addListener(map, 'zoom_changed', () => togglePolygons(map.getLevel() > 8));
      return map;
    } catch (error) {
      console.error('Error creating map:', error);
    }
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
    kakao.maps.event.addListener(marker, 'click', () => {
      updateInfoWindow(marker);
      navigate('pools');
    });
    return marker;
  }

  //#endregion

  //#region InfoWindow

  /**
   * @description
   * 인포윈도우 업데이트
   * @param {kakao.maps.Marker} marker - 마커 객체
   */
  async function updateInfoWindow(marker) {
    try {
      const { data: pool } = await kakaoMapApi.getPool(marker.getTitle());

      // 기존 인포윈도우 내용을 비우고 새로운 컨테이너를 생성
      const container = document.createElement('div');
      container.className = 'bg-white shadow-lg rounded-lg p-4 w-[337px] border border-gray-200';
      setInfoWindowContainer(container); // 포탈을 위한 컨테이너 저장
      setSelectedPool(pool); // 선택한 수영장 데이터 업데이트

      infoWindow.setContent(container); // 인포윈도우에 React 컨테이너 적용
      infoWindow.open(marker.getMap(), marker);
      dispatch(setInfoWindow(infoWindow)); // 인포윈도우 리덕스에 보관
    } catch (error) {
      console.log(error);
      setError(error);
    }
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
      strokeColor: '#056FC4',
      strokeOpacity: 0.8,
      fillColor: '#fff',
      fillOpacity: 0.4,
    });
    polygons.push(polygon);

    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', (e) => {
      polygon.setOptions({ fillColor: '#09f' });
      customOverlay.setContent(
        `<div class="absolute bg-white border border-gray-500 rounded-sm text-lg top-[-15px] left-[15px] p-1">
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
      polygon.setOptions({ fillColor: '#fff', fillOpacity: 0.4 });
      customOverlay.setMap(null);
    });

    kakao.maps.event.addListener(polygon, 'click', async (e) => {
      if (markers && markers.length) {
        markers.forEach((marker) => marker.setMap(null));
      }
      try {
        map.setLevel(7);
        map.panTo(e.latLng);
        customOverlay.setMap(null);
        polygon.setOptions({ fillColor: '#fff' });

        const { data: pools } = await kakaoMapApi.getSectionWithPools(name);
        const markers = pools.map(({ latitude, longitude, name }) =>
          createMarker(new kakao.maps.LatLng(latitude, longitude), name),
        );
        // 마커 화면에서 제거에 활용
        dispatch(updateMarkers(markers));
        // 지역별 수영장 정보
        dispatch(setPools(pools));
        dispatch(setName(name));
        navigate('pools');
      } catch (error) {
        setError(
          new RequestError('네트워크 연결을 확인해주세요', ERROR_CODE.INTERNAL_SERVER_ERROR),
        );
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
      dispatch(setMap(createMap(mapContainer.current)));
      drawPolygons(seoulGu);
    }
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {selectedPool && infoWindowContainer && (
        <InfoWindowContentPortal pool={selectedPool} container={infoWindowContainer} />
      )}
    </>
  );
}
