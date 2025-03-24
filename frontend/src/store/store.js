import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import sideBarSlice from './slices/sideBarSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    sideBar: sideBarSlice,
    user: userSlice,
  },
});

export default store;
