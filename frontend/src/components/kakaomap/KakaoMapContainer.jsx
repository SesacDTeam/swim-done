import React, { useEffect, useRef } from 'react';
import { createMap, drawPolygons } from './KakaoMapService';
import seoulGu from '../../utils/seoul-gu.json';

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
