/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchDrinkById } from '../redux/slices/drinkRecipesSlice';
import { fecthSuggestedMeals } from '../redux/slices/foodRecipesSlice';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/pageDetails.css';

const copy = require('clipboard-copy');

export default function DrinkDetails() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { drinkDetail } = useSelector((store) => store.drinkRecipes);
  const { suggestedMeals } = useSelector((store) => store.foodRecipes);

  // Requisito 40
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const showButton = Object.keys(storage).length > 0 && storage.cocktails[index];

  const [copied, setCopied] = useState(false);

  // Requisito 43
  const hasFavoriteInStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const thisRecipeIsFavorited = hasFavoriteInStorage.length > 0
    && hasFavoriteInStorage.some((receita) => receita.id === index);
  const [srcFavorite, setSrcFavorite] = useState(thisRecipeIsFavorited);

  useEffect(() => {
    dispatch(fetchDrinkById(index));
    dispatch(fecthSuggestedMeals());
  }, []);

  const mapIngredients = (drink) => {
    const DEZ = 10;
    const items = [];
    const mensure = [];
    for (let i = 1; i < DEZ; i += 1) {
      if (drink[`strIngredient${i}`] !== null) {
        items.push(drink[`strIngredient${i}`]);
        mensure.push(drink[`strMeasure${i}`]);
      }
    }
    return items.map((element, i) => (
      <p key={ element } data-testid={ `${i}-ingredient-name-and-measure` }>
        {element}
        {mensure[i] ? `-  ${mensure[i]}` : ''}
      </p>
    ));
  };

  const handleClick = () => {
    history.push(`/bebidas/${index}/in-progress`);
  };

  const share = () => {
    copy(`http://localhost:3000/bebidas/${index}`);
    setCopied(true);
  };

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

  return (
    <>
      <span> </span>
      {drinkDetail
        && drinkDetail.map((drink) => (
          <div className="body" key={ drink }>
            <img
              className="food-img"
              src={ drink.strDrinkThumb }
              data-testid="recipe-photo"
              alt=""
            />
            <div className="container">
              <div className="header">
                <div className="title">
                  <h3 data-testid="recipe-title">{drink.strDrink}</h3>
                  <p data-testid="recipe-category">{drink.strAlcoholic}</p>
                </div>
                <button
                  onClick={ () => share() }
                  type="button"
                  data-testid="share-btn"
                >
                  Compartilhar
                </button>
                {copied && <p>Link copiado!</p>}
                <button
                  type="button"
                  onClick={ () => favorite() }
                  src={ srcFavorite ? blackHeartIcon : whiteHeartIcon }
                  data-testid="favorite-btn"
                >
                  <img
                    src={ srcFavorite ? blackHeartIcon : whiteHeartIcon }
                    alt=""
                  />
                </button>
              </div>
              <div
                className="ingredients"
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <h2>Ingredientes</h2>
                <div className="line" />
                <div className="values-ingredients">
                  {mapIngredients(drink)}
                </div>
              </div>
              <div className="instructions">
                <h3>Instruções</h3>
                <div className="line" />
                <p data-testid="instructions">{drink.strInstructions}</p>
              </div>
              <div className="carousel">
                {suggestedMeals.map(({ strMeal, strMealThumb }, indice) => (
                  <div className="item" key={ strMeal }>
                    <button
                      className="card"
                      type="button"
                      data-testid={ `${indice}-recomendation-card` }
                    >
                      <img
                        className="image-item"
                        src={ strMealThumb }
                        alt={ strMeal }
                      />
                      <p data-testid={ `${indice}-recomendation-title` }>
                        {strMeal}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={ () => handleClick() }
              className="start"
              type="button"
              data-testid="start-recipe-btn"
            >
              {showButton ? 'Continuar Receita' : 'Iniciar Receita'}
            </button>
          </div>
        ))}
    </>
  );
}
