import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/sidebar/SideBar';

export default function Home() {
  return (
    <>
      <SideBar></SideBar>
      <Outlet></Outlet>
    </>
  );
}
