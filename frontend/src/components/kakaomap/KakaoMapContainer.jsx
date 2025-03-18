import React, { useEffect, useRef, useState } from 'react';
import { createMap, initCenterHandler } from './kakaoMapService';

export default function KakaoMapContainer() {
  const mapContainer = useRef(null);
  const [kakaoMap, setKakaoMap] = useState(null);

  useEffect(() => {
    if (kakao && kakao.maps) {
      const mapInstance = createMap(mapContainer.current);
      setKakaoMap(mapInstance);
    }
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
      <div>
        <button type="button" onClick={() => initCenterHandler(kakaoMap)}>
          위치 초기화
        </button>
      </div>
    </>
  );
}
