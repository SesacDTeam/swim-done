import React from 'react';

export default function SideBarItem({ image, selectedImage, title, isSelected, onClick }) {
  return (
    <>
      <div
        className={`mt-5 w-full pb-7 pt-7 border-2 ${isSelected ? 'bg-blue01/30 border-blue01  rounded-xl' : 'cursor-pointer border-transparent'}`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center gap-1">
          <img
            src={isSelected ? selectedImage : image}
            alt=""
            className="h-12 aspect-square select-none"
            draggable={false}
          />
          <div
            className={`pretendard-normal text-sm select-none ${isSelected ? 'text-blue01' : 'text-body01'}`}
          >
            {title}
          </div>
        </div>
      </div>
    </>
  );
}
