import React from 'react';
import staticImagePath from '../../utils/staticImagePath';
import SideBarItem from './SideBarItem';

export default function SideBar() {
  return (
    <>
      <div className="border-gray03 border-[0.5px] w-30 flex flex-col items-center h-full">
        <img src={staticImagePath.logo} alt="" className="w-2/3 mt-5" />
        <div className="h-[0.5px] w-full bg-gray03 mt-[20px]"></div>

        <SideBarItem
          image={staticImagePath.mypage}
          selectedImage={staticImagePath.mypageColor}
          title="마이페이지"
          isSelected={false}
        ></SideBarItem>
        <SideBarItem
          image={staticImagePath.markPool}
          selectedImage={staticImagePath.markPoolColor}
          title="내가 찜한 수영장"
          isSelected={true}
        ></SideBarItem>
      </div>
    </>
  );
}
