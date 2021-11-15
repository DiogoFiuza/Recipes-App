/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkById } from '../redux/slices/drinkRecipesSlice';
import '../styles/pageProgress.css';

export default function DrinkProgress() {
  const history = useHistory();
  const storageLocal = localStorage.getItem('inProgressRecipes');
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { drinkDetail } = useSelector((store) => store.drinkRecipes);
  let ingredients = [];
  const [block, desblock] = useState(true);

  const setLocalState = () => {
    if (storageLocal === null) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {
          [index]: ingredients },
        }));
    } else {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ ...JSON.parse(storageLocal),
          cocktails: {
            ...JSON.parse(storageLocal).cocktails,
            [index]: ingredients },
        }));
    }
  };

  const createLocalState = () => {
    const obj = drinkDetail[0];
    const maxLength = 3;
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
    const box = document.getElementById(target.id);
    const arrayObjetos = ingredients;
    arrayObjetos[target.id].completed = box.checked;
    ingredients = arrayObjetos;
    setLocalState();
    unlock();
  };

  const verification = () => {
    if (storageLocal === null || JSON.parse(storageLocal).cocktails == null) {
      createLocalState();
    } else {
      const idDasBebidasNoLocalStorage = Object.keys(JSON.parse(storageLocal).cocktails);
      if (idDasBebidasNoLocalStorage.find((a) => a === index) === index) {
        ingredients = JSON.parse(storageLocal).cocktails[index];
      } else {
        createLocalState();
      }
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
            {checklist()}
          </ul>
          <h3>Istruções</h3>
          <p data-testid="instructions">{drinks.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            disabled={ block }
            type="button"
          >
            Finalizar
          </button>
        </div>
      ))}
    </>
  );
}
