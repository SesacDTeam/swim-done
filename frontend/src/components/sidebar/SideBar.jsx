import React, { useState } from 'react';
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
import { hideSideBar, showSideBar } from '../../store/slices/sideBarSlice';
import { resetMap } from '../../store/slices/kakaoMapSlice';
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
  const [selectedIndex, setSelectedIndex] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickItem = (index) => {
    if (index === 0) {
      // ✅ 로그인 여부 확인
      const isLoggedIn = localStorage.getItem('accessToken');

      if (!isLoggedIn) {
        // ✅ 이동 전 사용자에게 확인 메시지 표시
        const confirmMove = window.confirm(
          '로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?',
        );

        if (confirmMove) {
          // 로그인 페이지로 이동 전에 현재 페이지를 저장
          localStorage.setItem('redirectAfterLogin', window.location.pathname);
          navigate('/login'); // 로그인 페이지로 이동
        } else {
          // ❌ "아니오" 선택 시 선택된 인덱스를 초기화하여 마이페이지가 안 뜨도록 처리
          setSelectedIndex(null);
        }
        return; //❗️ 여기서 함수 종료 (이후 코드 실행 방지)
      }
    }
    // ✅ 로그인한 경우에만 선택한 인덱스를 업데이트
    setSelectedIndex(index);

    // navigate('/mypage');
    if (index === 0) {
      navigate('/mypage'); // 마이페이지로 이동
    } else {
      navigate('/mark-pools'); // 찜한 수영장 페이지로 이동
    }

    dispatch(showSideBar());
  };

  const handleToMain = () => {
    navigate('/');
    setSelectedIndex(null);
    dispatch(hideSideBar());
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
              isSelected={selectedIndex === index}
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
