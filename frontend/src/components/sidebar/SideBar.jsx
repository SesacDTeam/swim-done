import React, { useState } from 'react';
import staticImagePath from '../../utils/staticImagePath';
import SideBarItem from './SideBarItem';
import { useNavigate } from 'react-router';

export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState();
  const navigate = useNavigate();

  const sideBarItems = [
    {
      image: staticImagePath.mypage,
      selectedImage: staticImagePath.mypageColor,
      title: '마이페이지',
    },
    {
      image: staticImagePath.markPool,
      selectedImage: staticImagePath.markPoolColor,
      title: '내가 찜한 수영장',
    },
  ];

  const handleClickItem = (index) => {
    setSelectedIndex(index);
    if (index === 0) {
      navigate('/mypage');
    } else {
      navigate('/mark-pools');
    }
  };

  const handleToMain = () => {
    navigate('/');
    setSelectedIndex(null);
  };

  return (
    <>
      <div className="border-gray03 border-[0.5px] w-30 flex flex-col items-center h-full">
        <img
          src={staticImagePath.logo}
          alt=""
          className="w-2/3 mt-5 cursor-pointer select-none"
          draggable={false}
          onClick={handleToMain}
        />
        <div className="h-[0.5px] w-full bg-gray03 mt-[20px]"></div>

        {sideBarItems.map((item, index) => {
          return (
            <SideBarItem
              key={index}
              image={item.image}
              selectedImage={item.selectedImage}
              title="마이페이지"
              isSelected={selectedIndex === index}
              onClick={() => handleClickItem(index)}
            ></SideBarItem>
          );
        })}

        <img
          src={staticImagePath.home}
          alt=""
          className="h-12 aspect-square absolute bottom-10 cursor-pointer select-none"
          draggable={false}
          onClick={handleToMain}
        />
      </div>
    </>
  );
}
