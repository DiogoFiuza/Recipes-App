/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../redux/slices/foodRecipesSlice';
import '../styles/pageProgress.css';

export default function FoodProgress() {
  const { mealDetail } = useSelector((store) => store.foodRecipes);
  const storageLocal = localStorage.getItem('inProgressRecipes');
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  let ingredients = [];
  const [block, desblock] = useState(true);

  const setLocalState = () => {
    if (storageLocal === null) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ meals: {
          [index]: ingredients },
        }));
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ ...JSON.parse(storageLocal),
          meals: {
            ...JSON.parse(storageLocal).meals,
            [index]: ingredients },
        }));
    }
  };

  const createLocalState = () => {
    const obj = mealDetail[0];
    const maxLength = 8;
    for (let i = 1; i <= maxLength; i += 1) {
      if (obj[`strIngredient${i}`] !== '') {
        ingredients.push({
          ingredient: obj[`strIngredient${i}`],
          value: obj[`strMeasure${i}`],
          completed: false,
        });
      }
    }
    setLocalState();
  };

  const unlock = () => {
    const xx = ingredients.filter(({ completed }) => completed);
    const yy = ingredients.length;
    if (xx.length === yy) {
      desblock(false);
    }
  };

  const saveProgress = ({ target }) => {
    // const box = document.getElementById(target.id);
    const arrayObjetos = ingredients;
    if (arrayObjetos[target.id].completed === false) {
      arrayObjetos[target.id].completed = true;
    } else {
      arrayObjetos[target.id].completed = false;
    }
    ingredients = arrayObjetos;
    setLocalState();
    unlock();
  };

  const verification = () => {
    if (storageLocal === null || JSON.parse(storageLocal).meals == null) {
      createLocalState();
    } else if (Object.keys(JSON.parse(storageLocal).meals)
      .find((a) => a === index) === index) {
      ingredients = JSON.parse(storageLocal).meals[index];
    } else {
      createLocalState();
    }
  };

  const checklist = () => {
    verification();

    return (
      ingredients.map(({ ingredient, value, completed }, i) => (
        <div
          key={ i }
          className={ `id${i}` }
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ i }
            onChange={ saveProgress }
            checked={ completed }
          />
          <p>
            {`${ingredient} - ${value}`}
          </p>
        </div>
      ))
    );
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
            {checklist()}
          </ul>
          <h3>Istruções</h3>
          <p data-testid="instructions">{meal.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            disabled={ block }
            type="button"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar
          </button>
        </div>
      ))}
    </>
  );
}
