/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchFoodById } from '../redux/slices/foodRecipesSlice';
import { fetchDrinksRecommended } from '../redux/slices/drinkRecipesSlice';
import '../styles/pageDetails.css';

export default function FoodDetails() {
  const history = useHistory();
  const path = history.location.pathname;
  const index = path.split('/')[2];
  const dispatch = useDispatch();
  const { mealDetail } = useSelector((store) => store.foodRecipes);
  const { suggestedDrink } = useSelector((store) => store.drinkRecipes);

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

  return (
    <>
      FoodDetail
      {mealDetail
        && mealDetail.map((meal) => (
          <div key={ meal } className="body">
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

                <div className="buttons">
                  <button type="button" data-testid="share-btn">
                    S
                  </button>
                  <button type="button" data-testid="favorite-btn">
                    L
                  </button>
                </div>
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
                  src={ meal.strYoutube }
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
                      type="button"
                      className="card"
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
              className="start"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/comidas/${index}/in-progress`) }
            >
              Iniciar Reaceita
            </button>
          </div>
        ))}
    </>
  );
}
