import React, { useEffect, useState } from 'react';
import {
  mypage,
  markPool,
  mypageColor,
  markPoolColor,
  home,
  logo,
} from '../../utils/staticImagePath';
import SideBarItem from './SideBarItem';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { resetMap } from '../../store/slices/kakaoMapSlice';
import { hideListBar } from '../../store/slices/listBarSlice';
// import { initCenterHandler } from '../kakaomap/KakaoMapService';

const sideBarItems = [
  {
    image: mypage,
    selectedImage: mypageColor,
    title: '마이페이지',
  },
  {
    image: markPool,
    selectedImage: markPoolColor,
    title: '내가 찜한 수영장',
  },
];

export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(sessionStorage.getItem('selectedIndex'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickItem = (index) => {
    setSelectedIndex(index);
    sessionStorage.setItem('selectedIndex', index);
    if (index === 0) {
      navigate('/mypage');
    } else {
      navigate('/mark-pools');
    }
  };

  const handleToMain = () => {
    navigate('/');
    setSelectedIndex(null);
    sessionStorage.removeItem('selectedIndex');
    dispatch(hideListBar());
    dispatch(resetMap());
  };

  return (
    <>
      <nav className="border-gray03 border-[0.5px] w-30 flex flex-col items-center h-full">
        <img
          src={logo}
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
              title={item.title}
              isSelected={
                sessionStorage.getItem('selectedIndex') !== null && Number(selectedIndex) === index
              }
              onClick={() => handleClickItem(index)}
            ></SideBarItem>
          );
        })}

        <img
          src={home}
          alt=""
          className="h-12 aspect-square absolute bottom-10 cursor-pointer select-none"
          draggable={false}
          onClick={handleToMain}
        />
      </nav>
    </>
  );
}
