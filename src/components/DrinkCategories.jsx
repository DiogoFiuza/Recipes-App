/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrinkCategories } from '../redux/slices/recipesCategoriesSlice';

export default function DrinkCategories({ handleFilters }) {
  const dispatch = useDispatch();
  const { drinkCategories } = useSelector((store) => store.recipeCategories);

  const renderDrinkCategories = () => {
    const MAX_LENGTH = 5;
    const baseCategories = drinkCategories.slice(0, MAX_LENGTH);
    return (
      <section className="drink-ingredients">
        { baseCategories.map((category) => (
          <button
            type="button"
            value={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            onClick={ handleFilters }
          >
            { category.strCategory }
          </button>

        ))}
        <button
          type="button"
          value="All"
          data-testid="All-category-filter"
          onClick={ handleFilters }
        >
          All
        </button>
      </section>
    );
  };

  useEffect(() => {
    dispatch(fetchDrinkCategories());
  }, []);

  return (
    <section>
      { renderDrinkCategories() }
    </section>
  );
}

DrinkCategories.propTypes = {
  handleFilters: PropTypes.func.isRequired,
};
