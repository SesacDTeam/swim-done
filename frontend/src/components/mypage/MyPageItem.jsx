import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyPageItem({ image, hoverImage, text, navigateTo }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo); // token을 state로 전달
  };

  return (
    <div className="flex h-20 items-center">
      <img
        src={isHovered ? hoverImage : image}
        alt=""
        className="w-20 h-15 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      />
      <div
        className="relative ml-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className={`text-2xl w-full ${isHovered ? 'text-blue02' : ''}`}>{text}</div>
      </div>
    </div>
  );
}
