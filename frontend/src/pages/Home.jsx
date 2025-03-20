import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import KakaoMapContainer from '../components/kakaomap/KakaoMapContainer';

export default function Home() {
  return (
    <>
      <div className="flex h-full">
        <SideBar></SideBar>
        <KakaoMapContainer></KakaoMapContainer>
        <Outlet></Outlet>
      </div>
    </>
  );
}
