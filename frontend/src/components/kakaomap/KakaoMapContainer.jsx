import React, { useEffect, useRef, useState } from 'react';
import { createMap } from './KakaoMapService';
import kakaoMapApi from '../../api/kakaoMapApi';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    /** @description 지도 및 수영장 데이터 호출 */
    async function fetchData() {
      const response = await kakaoMapApi.getSections();
      try {
        if (!response) {
          throw new Error('response is null');
        }
        const points = response.data;
        if (kakao && kakao.maps) {
          createMap(mapContainer.current, points);
          setPoints(points);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </>
  );
}
