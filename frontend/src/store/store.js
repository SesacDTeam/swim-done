import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import sideBarSlice from './slices/sideBarSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    sideBar: sideBarSlice,
  },
});

export default store;
