/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkById } from '../redux/slices/drinkRecipesSlice';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/pageProgress.css';

const copy = require('clipboard-copy');

export default function DrinkProgress() {
  const history = useHistory();
  const storageLocal = localStorage.getItem('inProgressRecipes');
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { drinkDetail } = useSelector((store) => store.drinkRecipes);
  let ingredients = [];
  const [block, desblock] = useState(true);
  const [copied, setCopied] = useState(false);

  const hasFavoriteInStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
  const thisRecipeIsFavorited = hasFavoriteInStorage.length > 0
    && hasFavoriteInStorage.some((receita) => receita.id === index);
  const [srcFavorite, setSrcFavorite] = useState(thisRecipeIsFavorited);

  const favorite = () => {
    // recuperar dados do localStorage acrescentar objeto favoritado e tirar de favorito caso já tenha
    if (!hasFavoriteInStorage.length > 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const drink = {
      id: drinkDetail[0].idDrink,
      type: 'bebida',
      area: '',
      alcoholicOrNot: drinkDetail[0].strAlcoholic,
      category: drinkDetail[0].strCategory,
      name: drinkDetail[0].strDrink,
      image: drinkDetail[0].strDrinkThumb,
    };
    const newStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const hasDrink = newStorage.find(
      (drinks) => drinks.id === drinkDetail[0].idDrink,
    );
    if (hasDrink) {
      const removeDrink = newStorage.filter(
        (cocktail) => cocktail.id !== drinkDetail[0].idDrink,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeDrink));
      setSrcFavorite(false);
    } else {
      newStorage.push(drink);
      console.log(newStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setSrcFavorite(true);
    }
  };

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

  const share = () => {
    copy(`http://localhost:3000/bebidas/${index}`);
    setCopied(true);
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
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => share() }
          >
            Compartilhar
          </button>
          {copied && <p>Link copiado!</p>}
          <button
            onClick={ () => favorite() }
            type="button"
            src={ srcFavorite ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
          >
            <img
              src={ srcFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favoritesvg"
            />
          </button>
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
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar
          </button>
        </div>
      ))}
    </>
  );
}
