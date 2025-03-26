import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIndex:
    sessionStorage.getItem('selectedIndex') !== null
      ? Number(sessionStorage.getItem('selectedIndex'))
      : null,
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
      sessionStorage.setItem('selectedIndex', action.payload);
    },
  },
});

export const { setSelectedIndex } = sideBarSlice.actions;
export default sideBarSlice.reducer;
