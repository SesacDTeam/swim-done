import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isLoggedIn: !!localStorage.getItem('accessToken'),
  // 로그인 이력 표시하기 위해 소셜 로그인 서비스 정보랑 로그인 이력 추가
  provider: localStorage.getItem('provider'),
  loginHistory: JSON.parse(localStorage.getItem('loginHistory')) || [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, provider } = action.payload
      state.accessToken = accessToken;
      state.provider = provider;
      state.isLoggedIn = true;

      // 기존 이력 유지하면서 새로운 로그인 기록 추가함
      const newHistory = [
        ...state.loginHistory,
        { provider, timestamp: new Date().toISOString() }
      ];
      state.loginHistory = newHistory;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('provider', provider);
      localStorage.setItem('loginHistory', JSON.stringify(newHistory)); // 배열로 로그인 이력 저장
    },
    logout: (state) => {
      state.accessToken = null;
      state.provider = null;
      state.isLoggedIn = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('provider');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
