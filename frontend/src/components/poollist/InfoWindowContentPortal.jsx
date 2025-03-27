import React from 'react';
import { createPortal } from 'react-dom';
import InfoWindowContent from './InfoWindowContent';

export default function InfoWindowContentPortal({ pool, container }) {
  if (!container) return null; // 컨테이너가 없으면 렌더링하지 않음
  return createPortal(<InfoWindowContent pool={pool} />, container);
}
