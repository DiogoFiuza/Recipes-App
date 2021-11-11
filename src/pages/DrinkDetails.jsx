/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchDrinkById } from '../redux/slices/drinkRecipesSlice';
import { fecthSuggestedMeals } from '../redux/slices/foodRecipesSlice';
import '../styles/pageDetails.css';

export default function DrinkDetails() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { drinkDetail } = useSelector((store) => store.drinkRecipes);
  const { suggestedMeals } = useSelector((store) => store.foodRecipes);

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

  return (
    <>
      {drinkDetail.map((drink) => (
        <div key={ drink } className="body">
          <img
            className="food-img"
            src={ drink.strDrinkThumb }
            data-testid="recipe-photo"
            alt=""
          />

          <div className="container">
            <div className="header">
              <div classNam="title">
                <h3 data-testid="recipe-title">{ drink.strDrink}</h3>
                <p data-testid="recipe-category">{drink.strAlcoholic}</p>
              </div>

              <div className="buttons">
                <button type="button" data-testid="share-btn">S</button>
                <button type="button" data-testid="favorite-btn">L</button>
              </div>
            </div>

            <div className="ingredients">
              <h2>Ingredientes</h2>
              <div className="line" />
              <div className="values-ingredients">
                { mapIngredients(drink)}
              </div>
            </div>

            <div className="instructions">
              <h3>Instruções</h3>
              <div className="line" />
              <p data-testid="instructions">{ drink.strInstructions }</p>
            </div>

            <div className="carousel">
              {
                suggestedMeals.map(({ strMeal, strMealThumb }, indice) => (
                  <div
                    classNam="item"
                    key={ strMeal }

                  >
                    <button
                      type="button"
                      data-testid={ `${indice}-recomendation-card` }
                      className="card"
                    >
                      <img
                        src={ strMealThumb }
                        alt={ strMeal }
                        className="image-item"
                      />
                      <p data-testid={ `${indice}-recomendation-title` }>{strMeal}</p>
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
          <button
            className="start"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/bebidas/${index}/in-progress`) }
          >
            Start
          </button>
        </div>
      ))}
    </>
  );
}
