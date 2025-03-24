import React from 'react';
import { logo } from '../utils/staticImagePath';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full select-none">
      <img src={logo} alt="" className="h-30" />
      <div className="flex flex-col items-center animate-pulse">
        <h1 className="pretendard-bold text-6xl text-blue01 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] rotate-[-2deg]">
          Not Found
        </h1>
        <h1 className="pretendard-bold text-6xl text-blue01 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          404
        </h1>
      </div>
      <button
        className="bg-blue01 text-white px-5 py-2 rounded-xl mt-10 cursor-pointer"
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        홈으로
      </button>
    </div>
  );
}
