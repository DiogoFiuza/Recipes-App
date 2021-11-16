import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from './slices/searchBarSlice';
import foodRecipesReducer from './slices/foodRecipesSlice';
import drinkRecipesReducer from './slices/drinkRecipesSlice';
import recipeCategoriesReducer from './slices/recipesCategoriesSlice';
import surpriseRecipeReducer from './slices/surpriseRecipeSlice';
import ingredientListReducer from './slices/ingredientListSlice';
import ingredientListDrinkReducer from './slices/ingredientsDrinkSlice';
import areaFoodListReducer from './slices/areaFoodListSlice';

const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    foodRecipes: foodRecipesReducer,
    drinkRecipes: drinkRecipesReducer,
    recipeCategories: recipeCategoriesReducer,
    surpriseRecipe: surpriseRecipeReducer,
    ingredientsList: ingredientListReducer,
    ingredientsListDrink: ingredientListDrinkReducer,
    areaFoodList: areaFoodListReducer,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;
