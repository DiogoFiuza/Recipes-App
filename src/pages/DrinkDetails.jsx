/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchDrinkById } from '../redux/slices/drinkRecipesSlice';
import { fecthSuggestedMeals } from '../redux/slices/foodRecipesSlice';
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
  console.log(storage);
  const showButton = Object.keys(storage).length > 0 && storage.cocktails[index];
  const [copied, setCopied] = useState(false);

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

  return (
    <>
      DrinkDetails
      {drinkDetail
        && drinkDetail.map((drink) => (
          <div key={ drink }>
            <img
              className="img"
              src={ drink.strDrinkThumb }
              data-testid="recipe-photo"
              alt=""
            />
            <h3 data-testid="recipe-title">{drink.strDrink}</h3>
            <p data-testid="recipe-category">{drink.strAlcoholic}</p>
            <button
              onClick={ () => share() }
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            { copied && <p>Link copiado!</p> }
            <button type="button" data-testid="favorite-btn">
              Favoritar
            </button>
            <div data-testid={ `${index}-ingredient-name-and-measure` }>
              <h2>Ingredientes</h2>
              {mapIngredients(drink)}
            </div>
            <h3>Instruções</h3>
            <p data-testid="instructions">{drink.strInstructions}</p>

            <div className="card">
              {suggestedMeals.map(({ strMeal, strMealThumb }, indice) => (
                <div
                  classNam="item"
                  key={ strMeal }
                  data-testid={ `${indice}-recomendation-card` }
                >
                  <img className="cardImage" src={ strMealThumb } alt={ strMeal } />
                  <p data-testid={ `${indice}-recomendation-title` }>{strMeal}</p>
                </div>
              ))}
            </div>
            <button
              onClick={ () => handleClick() }
              className="star-btn"
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
