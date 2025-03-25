import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import sideBarSlice from './slices/sideBarSlice';
import detailViewSlice from './slices/detailViewSlice'
import kakaoMapSlice from './slices/kakaoMapSlice'
const store = configureStore({
  reducer: {
    auth: authSlice,
    sideBar: sideBarSlice,
    detailView: detailViewSlice,
    kakaoMap: kakaoMapSlice
  },
});

export default store;
