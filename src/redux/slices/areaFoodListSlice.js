import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  areasApi: [],
  error: '',
  callFunctionArea: false,
  foodArea: [],
  area: 'Canadian',
};

export const fetchAreas = createAsyncThunk(
  'areasList/fetchAreas',
  async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    return response.json();
  },
);

export const fetchFoodByArea = createAsyncThunk(
  'areasFoods/fetchFoodByArea',
  async (area) => {
    let responseFoods = [];
    if (area === 'All') {
      responseFoods = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      responseFoods = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    }

    return responseFoods.json();
  },
);

export const areasListSlice = createSlice({
  name: 'areasList',
  initialState,
  reducers: {
    callFunctionTrueArea(state) {
      state.callFunctionArea = true;
    },
    setArea(state, action) {
      state.area = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.areasApi = action.payload.meals;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFoodByArea.fulfilled, (state, action) => {
        state.foodArea = action.payload.meals;
      })
      .addCase(fetchFoodByArea.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { callFunctionTrueArea, setArea } = areasListSlice.actions;
export default areasListSlice.reducer;
