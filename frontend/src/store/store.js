import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import listBarSlice from './slices/listBarSlice';
import userSlice from './slices/userSlice';
import detailViewSlice from './slices/detailViewSlice';
import kakaoMapSlice from './slices/kakaoMapSlice';
import sideBarSlice from './slices/sideBarSlice';
import errorSlice from './slices/errorSlice';
import loadingSlice from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    listBar: listBarSlice,
    detailView: detailViewSlice,
    kakaoMap: kakaoMapSlice,
    user: userSlice,
    sideBar: sideBarSlice,
    error: errorSlice,
    loading: loadingSlice,
  },
});

export default store;
