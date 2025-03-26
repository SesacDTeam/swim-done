import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = error;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
