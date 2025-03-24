import React, { useEffect, useRef, useState } from 'react';
import { createMap, drawPolygons } from './KakaoMapService';
import kakaoMapApi from '../../api/kakaoMapApi';
import seoulGu from '../../utils/seoul-gu.json';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);

  useEffect(() => {
    /** @description 지도 및 수영장 데이터 호출 */
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
