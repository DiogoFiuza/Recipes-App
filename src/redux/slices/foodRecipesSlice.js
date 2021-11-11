import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  initialMeals: [],
  meals: [],
  mealDetail: [],
  suggestedMeals: [],
};

export const fetchMeals = createAsyncThunk(
  'foodRecipes/fetchMeals',
  async (payload) => {
    const { query, option } = payload;
    let response = {};
    switch (option) {
    case 'ingredient':
      response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
      );
      break;
    case 'name':
      response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      );
      break;
    case 'firstLetter':
      response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
      );
      break;
    default:
      break;
    }
    return response.json();
  },
);

export const fetchFoodById = createAsyncThunk(
  'foodRecipes/fetchFoodById',
  async (id) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.json();
  },
);

export const fetchMealsByCategory = createAsyncThunk(
  'foodRecipes/fetchMealsByCategory',
  async (category) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const response = await data.json();
    return response;
  },
);

export const fecthSuggestedMeals = createAsyncThunk(
  'foodRecipes/fecthSuggestedMeals',
  async () => {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const response = await data.json();
    return response;
  },
);

export const foodRecipesSlice = createSlice({
  name: 'foodRecipes',
  initialState,
  reducers: {
    populateMeals: (state, action) => {
      state.meals = action.payload;
      state.initialMeals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.meals = action.payload.meals;
        state.loading = false;
      })
      .addCase(fetchMeals.rejected, (state) => {
        state.meals = null;
      })
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.meals = action.payload.meals;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.mealDetail = action.payload.meals;
      })
      .addCase(fecthSuggestedMeals.fulfilled, (state, action) => {
        const SIX = 6;
        const sixSuggestedMeals = action.payload.meals.slice(0, SIX);
        state.suggestedMeals = sixSuggestedMeals;
      });
  },
});

export const { populateMeals } = foodRecipesSlice.actions;

export default foodRecipesSlice.reducer;
