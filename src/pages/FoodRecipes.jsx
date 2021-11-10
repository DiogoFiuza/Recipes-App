/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import FoodCategories from '../components/FoodCategories';
import Header from '../components/Header';
import MealRecipeCard from '../components/MealRecipeCard';
import SearchBar from '../components/SearchBar';
import {
  fetchMeals,
  fetchMealsByCategory,
  populateMeals,
} from '../redux/slices/foodRecipesSlice';

export default function FoodRecipes() {
  const title = 'Comidas';
  const history = useHistory();
  const dispatch = useDispatch();
  const { query, option } = useSelector((store) => store.searchBar);
  const { meals } = useSelector((store) => store.foodRecipes);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = { query, option };
    if (query.length !== 1 && option === 'firstLetter') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      console.log(query.length);
    } else {
      dispatch(fetchMeals(payload));
    }
  };

  const handleFilters = ({ target }) => {
    const category = target.value;
    dispatch(fetchMealsByCategory(category));
  };

  const renderFoodCards = () => {
    const MAX_LENGTH = 12;

    const filteredMeals = meals.slice(0, MAX_LENGTH);
    return (
      <section>
        {filteredMeals.map((meal, index) => (
          <MealRecipeCard key={ meal.idMeal } index={ index } meal={ meal } />
        ))}
      </section>
    );
  };

  useEffect(() => {
    const fetchBaseMeals = async () => {
      const baseMeals = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const response = await baseMeals.json();
      dispatch(populateMeals(response.meals));
    };
    fetchBaseMeals();
  }, []);

  useEffect(() => {
    const getMeals = async () => {
      const payload = { query, option };
      await dispatch(fetchMeals(payload));
    };
    getMeals();
  }, []);

  useEffect(() => {
    if (!meals) {
      global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    } else if (submitted === true && meals.length === 1) {
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  }, [meals]);

  return (
    <>
      <Header
        title={ title }
        searchBar={ <SearchBar handleSubmit={ handleSubmit } /> }
      />
      <main>
        <FoodCategories handleFilters={ handleFilters } />
        {meals && renderFoodCards()}
      </main>
      <Footer />
    </>
  );
}
