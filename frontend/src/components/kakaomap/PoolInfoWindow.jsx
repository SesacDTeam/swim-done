import React from 'react';

export default function PoolInfoWindow() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[337px] border border-gray-200">
      <h2 className="text-xl font-bold text-black">장한평 수영장</h2>
      <p className="text-gray-600 text-sm">성동구 자동차시장 1길 64(용답동)</p>
      <div className="mt-2 text-sm text-gray-800">
        <p>평일 : 18:00 ~ 19:00, 20:00 ~ 21:00</p>
        <p>주말 : 18:00 ~ 19:00</p>
      </div>
      <p className="mt-2 text-xs text-blue-500 cursor-pointer hover:underline">
        * 다른 요일이 궁금하다면? 클릭 후 더 자세히 확인할 수 있어요!
      </p>
    </div>
  );
}
