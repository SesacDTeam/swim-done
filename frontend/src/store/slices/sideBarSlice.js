import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHidden: true
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    showSideBar: (state, action) => {
      state.isHidden = false
    },

    hideSideBar: (state, action) => {
      state.isHidden = true
    }
  }
})

export const { showSideBar, hideSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;