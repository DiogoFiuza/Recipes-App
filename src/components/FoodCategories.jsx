/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFoodCategories } from '../redux/slices/recipesCategoriesSlice';

export default function FoodCategories({ handleFilters }) {
  const dispatch = useDispatch();
  const { foodCategories } = useSelector((store) => store.recipeCategories);

  const renderFoodCategories = () => {
    const MAX_LENGTH = 5;
    const baseCategories = foodCategories.slice(0, MAX_LENGTH);
    return (
      <section className="food-ingredients">
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
    dispatch(fetchFoodCategories());
  }, []);

  return (
    <section>
      { renderFoodCategories() }
    </section>
  );
}

FoodCategories.propTypes = {
  handleFilters: PropTypes.func.isRequired,
};
