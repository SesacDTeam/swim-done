import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import KakaoMapContainer from '../components/kakaomap/KaKaoMapContainer';

export default function Home() {
  return (
    <>
      <SideBar></SideBar>
      <KakaoMapContainer></KakaoMapContainer>
      <Outlet></Outlet>
    </>
  );
}
