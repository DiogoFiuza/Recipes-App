import PropTypes from 'prop-types';
import React from 'react';
import '../styles/pageDetails.css';
import { Link } from 'react-router-dom';

export default function MealRecipeCard({ meal, index }) {
  return (
    <Link to={ `/comidas/${meal.idMeal}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="100"
        />
        <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
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
