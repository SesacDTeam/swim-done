import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setRequestError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRequestError } = errorSlice.actions;
export default errorSlice.reducer;
