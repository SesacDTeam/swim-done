import React from 'react';

export default function RecentLoginLabel() {
  return (
    <div className="absolute top-[-20px] left-30 bg-white text-title border border-gray02 text-xs px-3 py-1 rounded-md shadow-md">
      최근 로그인
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-4 h-3 bg-white border-l border-r border-gray02"
        style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}
      ></div>
    </div>
  );
}
