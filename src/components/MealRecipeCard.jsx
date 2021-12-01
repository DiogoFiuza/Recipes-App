import PropTypes from 'prop-types';
import React from 'react';
import '../styles/pageDetails.css';
import { Link } from 'react-router-dom';

export default function MealRecipeCard({ meal, index }) {
  return (
    <Link to={ `/comidas/${meal.idMeal}` }>
      <div className="container-card-food">
        <div className="card-recipe-food card" data-testid={ `${index}-recipe-card` }>
          <div className="chato">
            <p
              className="title-card"
              data-testid={ `${index}-card-name` }
            >
              { meal.strMeal }
            </p>
          </div>
          <img
            className="img-card"
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            width="100"
          />
        </div>
      </div>
    </Link>
  );
}

MealRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};
