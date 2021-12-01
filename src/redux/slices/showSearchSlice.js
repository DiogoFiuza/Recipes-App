import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

export const showSearchSlice = createSlice({
  name: 'showSearch',
  initialState,
  reducers: {
    toggleShowSearch: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleShowSearch } = showSearchSlice.actions;

export default showSearchSlice.reducer;
