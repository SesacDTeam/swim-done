import React, { useState } from 'react';

export default function MyPageItem({ image, hoverImage, text, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-20 items-center">
      <img
        src={isHovered ? hoverImage : image}
        alt=""
        className="w-20 h-15 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      />
      <div
        className="relative ml-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className={`text-2xl w-full ${isHovered ? 'text-blue02' : ''}`}>{text}</div>
      </div>
    </div>
  );
}
