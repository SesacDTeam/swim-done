import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import KakaoMapContainer from '../components/kakaomap/KaKaoMapContainer';
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
            <section className="absolute left-0 top-0 bottom-0 w-100 z-3000 bg-white overflow-y-scroll">
              <Outlet></Outlet>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
