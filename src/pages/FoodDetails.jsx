/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../redux/slices/foodRecipesSlice';
import { fetchDrinksRecommended } from '../redux/slices/drinkRecipesSlice';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/pageDetails.css';

const copy = require('clipboard-copy');

export default function FoodDetails() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { mealDetail } = useSelector((store) => store.foodRecipes);
  const { suggestedDrink } = useSelector((store) => store.drinkRecipes);
  const [copied, setCopied] = useState(false);

  // Requisito 40
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const showButton = Object.keys(storage).length > 0 && storage.meals[index];

  // Requisito 44
  const hasFavoriteInStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
  const thisRecipeIsFavorited = hasFavoriteInStorage.length > 0 && hasFavoriteInStorage
    .some((receita) => receita.id === index);
  const [srcFavorite] = useState(thisRecipeIsFavorited);

  useEffect(() => {
    dispatch(fetchFoodById(index));
    dispatch(fetchDrinksRecommended());
  }, []);

  const mapIngredients = (meal) => {
    const DEZ = 10;
    const items = [];
    const mensure = [];
    for (let i = 1; i < DEZ; i += 1) {
      if (meal[`strIngredient${i}`] !== '') {
        items.push(meal[`strIngredient${i}`]);
        mensure.push(meal[`strMeasure${i}`]);
      }
    }
    return items.map((element, i) => (
      <p
        key={ element }
        data-testid={ `${i}-ingredient-name-and-measure` }
      >
        {element}
        { mensure[i] ? `-  ${mensure[i]}` : ''}
      </p>
    ));
  };

  const handleClick = () => {
    history.push(`/comidas/${index}/in-progress`);
  };

  const share = () => {
    copy(`http://localhost:3000/comidas/${index}`);
    setCopied(true);
  };

  return (
    <>
      FoodDetail
      { mealDetail && mealDetail.map((meal) => (
        <div key={ meal }>
          <img
            className="img"
            src={ meal.strMealThumb }
            data-testid="recipe-photo"
            alt="imagem"
          />
          <h2 data-testid="recipe-title">{ meal.strMeal}</h2>
          <p data-testid="recipe-category">{meal.strCategory}</p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => share() }
          >
            Compartilhar
          </button>
          { copied && <p>Link copiado!</p> }
          <button
            type="button"
            src={ srcFavorite ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
          >
            <img
              src={ srcFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favoritesvg"
            />
          </button>
          <div data-testid={ `${index}-ingredient-name-and-measure` }>
            <h3>Ingredientes</h3>
            { mapIngredients(meal)}
          </div>
          <h3>Instruções</h3>
          <p data-testid="instructions">{ meal.strInstructions }</p>
          <h3>Vídeo</h3>
          <iframe
            src={ meal.strYoutube }
            title={ `video ${meal}` }
            frameBorder="0"
            data-testid="video"
            allow=" autoplay; clipboard-write; encrypted-media; picture-in-picture"
          />
          <div className="card">
            {
              suggestedDrink.map(({ strDrink, strDrinkThumb }, indice) => (
                <div
                  classNam="item"
                  key={ strDrink }
                  data-testid={ `${indice}-recomendation-card` }
                >
                  <img className="cardImage" src={ strDrinkThumb } alt={ strDrink } />
                  <p data-testid={ `${indice}-recomendation-title` }>{strDrink}</p>
                </div>
              ))
            }
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
