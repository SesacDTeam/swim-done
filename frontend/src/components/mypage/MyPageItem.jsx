import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyPageItem({ image, hoverImage, text, navigateTo, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // 부모 요소로 이벤트 전파 방지
    if (navigateTo) {
      navigate(navigateTo); // navigateTo가 있으면 페이지 이동
    }
    if (onClick) {
      onClick(e); // onClick이 있으면 호출
    }
  };

  return (
    <div className="flex h-20 items-center" onClick={handleClick}>
      <img
        src={isHovered ? hoverImage : image}
        className="w-20 h-15 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div
        className="relative ml-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`text-2xl w-full ${isHovered ? 'text-blue02' : ''}`}>{text}</div>
      </div>
    </div>
  );
}
