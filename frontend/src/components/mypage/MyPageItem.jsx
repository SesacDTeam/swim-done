import React, { useState } from 'react';

export default function MyPageItem({ image, hoverImage, text, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-03 items-center" onClick={onClick}>
      <img
        src={isHovered ? hoverImage : image}
        className="w-20 h-10 cursor-pointer"
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
