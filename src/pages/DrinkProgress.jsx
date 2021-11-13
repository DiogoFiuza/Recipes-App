/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkById } from '../redux/slices/drinkRecipesSlice';
import '../styles/pageProgress.css';

export default function DrinkProgress() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { drinkDetail } = useSelector((store) => store.drinkRecipes);
  const ingredients = [];

  const progressIngredient = () => {
    const obj = drinkDetail[0];
    const maxLength = 3;
    for (let i = 1; i <= maxLength; i += 1) {
      if (obj[`strIngredient${i}`] !== null) {
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
    dispatch(fetchDrinkById(index));
  }, []);

  return (
    <>
      {drinkDetail.map((drinks) => (
        <div key={ drinks.idDrink } className="body">
          <img
            src={ drinks.strDrinkThumb }
            alt={ drinks.idDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{drinks.strDrink}</h2>
          <button type="button" data-testid="share-btn">S</button>
          <button type="button" data-testid="favorite-btn">L</button>
          <p data-testid="recipe-category">{drinks.strAlcoholic}</p>
          <ul>
            {progressIngredient()}
          </ul>
          <h3>Istruções</h3>
          <p data-testid="instructions">{drinks.strInstructions}</p>
          <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
        </div>
      ))}
    </>
  );
}
