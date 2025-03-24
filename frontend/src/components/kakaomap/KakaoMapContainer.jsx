import React, { useEffect, useRef, useState } from 'react';
import { createMap, drawPolygons } from './KakaoMapService';
import kakaoMapApi from '../../api/kakaoMapApi';
import seoulGu from '../../utils/seoul-gu.json';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    /** @description 지도 및 수영장 데이터 호출 */
    async function fetchData() {
      const response = await kakaoMapApi.getSections();
      try {
        if (!response) {
          throw new Error('Response is null');
        }
        const points = response.data;
        if (kakao && kakao.maps) {
          createMap(mapContainer.current, points);
          drawPolygons(seoulGu);
          setPoints(points);
        }
      } catch (error) {
        console.error(error);
      }
    }
    // seoulGu.forEach(({coordinates, SIG_KOR_NM}) => {
    //   displayArea(coordinates, SIG_KOR_NM);
    // });
    fetchData();
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </>
  );
}
