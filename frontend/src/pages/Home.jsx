import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import KakaoMapContainer from '../components/kakaomap/KakaoMapContainer';
import { useDispatch, useSelector } from 'react-redux';
import { hideListBar } from '../store/slices/listBarSlice';
import { setSelectedIndex } from '../store/slices/sideBarSlice';

export default function Home() {
  const isHidden = useSelector((state) => state.listBar.isHidden);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(setSelectedIndex(null))
      dispatch(hideListBar());
    }
  }, [location, dispatch]);

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
