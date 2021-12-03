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
  console.log(mealDetail);
  const { suggestedDrink } = useSelector((store) => store.drinkRecipes);
  const [copied, setCopied] = useState(false);

  const storage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const showButton = Object.keys(storage).length > 0 && storage.meals[index];

  const hasFavoriteInStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || {};
  const thisRecipeIsFavorited = hasFavoriteInStorage.length > 0
    && hasFavoriteInStorage.some((receita) => receita.id === index);
  const [srcFavorite, setSrcFavorite] = useState(thisRecipeIsFavorited);

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
      <p key={ element } data-testid={ `${i}-ingredient-name-and-measure` }>
        {element}
        {mensure[i] ? `-  ${mensure[i]}` : ''}
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

  const favorite = () => {
    // recuperar dados do localStorage acrescentar objeto favoritado e tirar de favorito caso já tenha
    if (!hasFavoriteInStorage.length > 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const meal = {
      id: mealDetail[0].idMeal,
      type: 'comida',
      area: mealDetail[0].strArea,
      category: mealDetail[0].strCategory,
      alcoholicOrNot: '',
      name: mealDetail[0].strMeal,
      image: mealDetail[0].strMealThumb,
    };
    const newStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const hasMeal = newStorage.find((food) => food.id === mealDetail[0].idMeal);
    if (hasMeal) {
      const removeMeal = newStorage.filter(
        (food) => food.id !== mealDetail[0].idMeal,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeMeal));
      setSrcFavorite(false);
    } else {
      newStorage.push(meal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setSrcFavorite(true);
    }
  };

  const videoLink = (link) => {
    const code = link.split('v=');
    return `http://www.youtube.com/embed/${code[1]}`;
  };

  console.log(suggestedDrink);

  return (
    <>
      <span> </span>
      {mealDetail
        && mealDetail.map((meal) => (
          <div className="body" key={ meal }>
            <img
              className="food-img"
              src={ meal.strMealThumb }
              data-testid="recipe-photo"
              alt="imagem"
            />
            <div className="container">
              <div className="header">
                <div className="title">
                  <h2 data-testid="recipe-title">{meal.strMeal}</h2>
                  <p data-testid="recipe-category">{meal.strCategory}</p>
                </div>
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
              </div>
              <div
                className="ingredients"
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <h3 className="text-ingredientes">Ingredientes</h3>
                <div className="line" />
                <div className="values-ingredients">{mapIngredients(meal)}</div>
              </div>
              <div className="instructions">
                <h3>Instruções</h3>
                <div className="line" />
                <p className="text-instructions" data-testid="instructions">
                  {meal.strInstructions}
                </p>
                <h3>Vídeo</h3>
                <iframe
                  src={ videoLink(meal.strYoutube) }
                  title={ `video ${meal}` }
                  frameBorder="0"
                  data-testid="video"
                  allow=" autoplay; clipboard-write; encrypted-media; picture-in-picture"
                />
              </div>
              <div className="carousel">
                {suggestedDrink.map(({ strDrink, strDrinkThumb }, indice) => (
                  <div key={ strDrink }>
                    <button
                      className="card"
                      type="button"
                      data-testid={ `${indice}-recomendation-card` }
                    >
                      <img
                        className="image-item"
                        src={ strDrinkThumb }
                        alt={ strDrink }
                      />
                      <p data-testid={ `${indice}-recomendation-title` }>
                        {strDrink}
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
