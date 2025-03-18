import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';

export default function Home() {
  return (
    <>
      <div className="flex h-full">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
