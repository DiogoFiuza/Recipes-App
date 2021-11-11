import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  surpriseApi: [],
};

export const fetchSurprise = createAsyncThunk(
  'surpriseRecipe',
  async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    return response.json();
  },
);

export const surpiseRecipeSlice = createSlice({
  name: 'supriseRecipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurprise.fulfilled, (state, action) => {
        state.surpriseApi = action.payload.meals;
      });
  },

});

export default surpiseRecipeSlice.reducer;
