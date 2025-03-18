import React, { useCallback, useState } from 'react';

export default function SideBarItem({ image, selectedImage, title, isSelected, onCLick }) {
  return (
    <>
      <div
        className={`mt-5 w-full pb-7 pt-7 ${isSelected && 'bg-blue01/30 border-blue01 border-2 rounded-xl'}`}
      >
        <div className="flex flex-col items-center  gap-1">
          <img src={isSelected ? selectedImage : image} alt="" className="h-12 aspect-square" />
          <div
            className={`pretendard-normal text-sm ${isSelected ? 'text-blue01' : 'text-body01'}`}
          >
            {title}
          </div>
        </div>
      </div>
    </>
  );
}
