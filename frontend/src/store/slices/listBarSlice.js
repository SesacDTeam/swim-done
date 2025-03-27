import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isHidden: true,
};

const listBarSlice = createSlice({
  name: 'listBar',
  initialState,
  reducers: {
    showListBar: (state, action) => {
      state.isHidden = false;
    },

    hideListBar: (state, action) => {
      state.isHidden = true;
    },
  },
});

export const { showListBar, hideListBar } = listBarSlice.actions;
export default listBarSlice.reducer;
