import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import KakaoMapContainer from '../components/kakaomap/KakaoMapContainer';
import { useSelector } from 'react-redux';

export default function Home() {
  const isHidden = useSelector((state) => state.sideBar.isHidden);

  return (
    <>
      <div className="flex h-full">
        <SideBar></SideBar>
        <div className="grow relative">
          <KakaoMapContainer></KakaoMapContainer>
          {!isHidden && (
            <section className="absolute inset-0 w-100 z-3000 bg-white overflow-y-auto">
              <Outlet></Outlet>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
