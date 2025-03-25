import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickName: localStorage.getItem('nickName') || '',
  email: localStorage.getItem('email') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { nickName, email } = action.payload;
      state.nickName = nickName;
      state.email = email;

      localStorage.setItem('nickName', nickName);
      localStorage.setItem('email', email);
    },
    clearUser: (state) => {
      state.nickName = '';
      state.email = '';
      localStorage.removeItem('nickName');
      localStorage.removeItem('email');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
