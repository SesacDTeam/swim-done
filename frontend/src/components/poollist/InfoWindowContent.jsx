import React from 'react';
/**
 * @description React 컴포넌트를 인포윈도우 콘텐츠로 활용하기 위한 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.poolName - 수영장 이름
 * @param {string} props.address - 수영장 주소
 * @param {string} props.swimmingTimes - 자유 수영 시간 HTML 문자열
 * @returns {JSX.Element} 인포윈도우 콘텐츠 컴포넌트
 */
export default function InfoWindowContent({ poolName, address, swimmingTimes }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[337px] border border-gray-200">
      <h2 className="text-xl font-bold text-black">{poolName}</h2>
      <p className="text-gray-600 text-sm">{address}</p>
      <div className="mt-2 text-sm text-gray-800">{swimmingTimes}</div>
      <p className="mt-2 text-xs text-blue-500 cursor-pointer hover:underline">
        * 다른 요일이 궁금하다면? 클릭 후 확인하세요!
      </p>
    </div>
  );
}
