import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import KakaoMapContainer from '../components/kakaomap/KaKaoMapContainer';

export default function Home() {
  return (
    <>
      <div className="flex h-full">
        <SideBar></SideBar>
        <div className='grow relative'>
          <KakaoMapContainer></KakaoMapContainer>
          <section className="absolute left-0 top-0 bottom-0 w-100 z-3000 bg-white">
            <Outlet></Outlet>
          </section>
        </div>
      </div>
    </>
  );
}
