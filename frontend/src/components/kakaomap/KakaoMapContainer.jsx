import React, { useEffect, useRef } from 'react';
import { createMap } from './KakaoMapService';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (kakao && kakao.maps) {
      createMap(mapContainer.current);
    }
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </>
  );
}
