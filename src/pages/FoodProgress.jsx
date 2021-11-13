/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../redux/slices/foodRecipesSlice';
import '../styles/pageProgress.css';

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

    const a = ({ target }) => {
      const filho = document.querySelector(`.id${target.id}`);
      if (target.checked === true) {
        filho.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      } else {
        filho.style.textDecoration = 'none solid rgb(0, 0, 0)';
      }
    };

    return ingredients.map(({ ingredient, value }, i) => (
      <div
        key={ i }
        className={ `id${i}` }
        data-testid={ `${index}-ingredient-step` }
      >
        <input type="checkbox" onChange={ a } id={ i } />
        <p>
          {`${ingredient} - ${value}`}
        </p>
      </div>));
  };

  useEffect(() => {
    dispatch(fetchFoodById(index));
  }, []);

  return (
    <>
      {mealDetail.map((meal) => (
        <div key={ meal.idMeal } className="body">
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
