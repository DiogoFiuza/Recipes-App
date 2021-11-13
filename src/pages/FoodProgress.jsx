/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../redux/slices/foodRecipesSlice';

export default function FoodProgress() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { mealDetail } = useSelector((store) => store.foodRecipes);
  const ingredients = [];

  const progressIngredient = () => {
    const obj = mealDetail[0];
    const maxLength = 8;
    for (let i = 1; i <= maxLength; i += 1) {
      if (obj[`strIngredient${i}`] !== '') {
        ingredients.push({
          ingredient: obj[`strIngredient${i}`],
          value: obj[`strMeasure${i}`],
        });
      }
    }

    return ingredients.map(({ ingredient, value }, i) => (
      <p
        data-testid={ `${index}-ingredient-step` }
        key={ i }
      >
        {`${ingredient} - ${value}`}
      </p>));
  };

  useEffect(() => {
    dispatch(fetchFoodById(index));
  }, []);

  return (
    <>
      {console.log(mealDetail)}
      {mealDetail.map((meal) => (
        <div key={ meal.idMeal }>
          <img src={ meal.strMealThumb } alt={ meal.idMeal } data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{meal.strMeal}</h2>
          <button type="button" data-testid="share-btn">S</button>
          <button type="button" data-testid="favorite-btn">L</button>
          <p data-testid="recipe-category">{meal.strCategory}</p>
          <ul>
            {progressIngredient()}
          </ul>
          <h3>Istruções</h3>
          <p data-testid="instructions">{meal.strInstructions}</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
        </div>
      ))}
    </>
  );
}
