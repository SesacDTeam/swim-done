import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isHidden: true,
};

const detailViewSlice = createSlice({
  name: 'detailView',
  initialState,
  reducers: {
    showDetailView: (state, action) => {
      state.isHidden = false;
    },

    hideDetailView: (state, action) => {
      state.isHidden = true;
    },
  },
});

export const { showDetailView, hideDetailView } = detailViewSlice.actions;
export default detailViewSlice.reducer;
