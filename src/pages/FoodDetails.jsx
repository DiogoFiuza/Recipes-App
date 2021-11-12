/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../redux/slices/foodRecipesSlice';
import { fetchDrinksRecommended } from '../redux/slices/drinkRecipesSlice';
import '../styles/pageDetails.css';

const copy = require('clipboard-copy');

export default function FoodDetails() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { mealDetail } = useSelector((store) => store.foodRecipes);
  const { suggestedDrink } = useSelector((store) => store.drinkRecipes);
  const [buttonName, setButtonName] = useState('Start');
  const [copied, setCopied] = useState(false);

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
    if (buttonName === 'Start') {
      setButtonName('Continuar Receita');
    } else {
      setButtonName('Start');
    }
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
          <button type="button" data-testid="favorite-btn">Favoritar</button>
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
            { buttonName }
          </button>
        </div>
      ))}
    </>
  );
}
