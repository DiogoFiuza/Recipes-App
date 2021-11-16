/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {
  callFunctionTrueArea,
  fetchAreas, fetchFoodByArea } from '../redux/slices/areaFoodListSlice';
import { setOption, setQuery } from '../redux/slices/searchBarSlice';

const container = {
  width: '100px',
};

export default function ExploreFoodsByOrigin() {
  const title = 'Explorar Origem';
  const MAX_LENGTH = 12;
  const { areasApi, foodArea } = useSelector((store) => store.areaFoodList);
  // const areas = areasApi.slice(0, MAX_LENGTH);
  const foodForArea = foodArea.slice(0, MAX_LENGTH);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAreas());
    dispatch(fetchFoodByArea('American'));
  }, []);
  const handleClick = (nome) => {
    dispatch(setQuery(nome));
    dispatch(setOption('origin'));
    dispatch(callFunctionTrueArea());
  };
  console.log(handleClick);
  const handleChange = (area) => {
    dispatch(fetchFoodByArea(area));
  };
  // o Searchbar aqui é um dropdown
  return (
    <>
      <Header title={ title } searchBar={ <SearchBar /> } />
      <select
        data-testid="explore-by-area-dropdown"
        name="areas"
        id="areas"
        onChange={ (e) => handleChange(e.target.value) }
      >
        {areasApi.map((element, index) => (
          <option
            key={ index }
            value={ element.strArea }
            data-testid={ `${element.strArea}-option` }
          >
            {element.strArea}
          </option>
        ))}
        <option data-testid="All-option">All</option>
      </select>
      {foodForArea.map((element, index) => (
        <Link
          key={ index }
          to={ `/comidas/${element.idMeal}` }
          style={ container }
        >
          <button
            key={ index }
            type="button"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ `${element.strMealThumb}/preview` }
              alt="imagem da comida"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{element.strMeal}</p>
          </button>
        </Link>
      ))}
      <Footer />
    </>
  );
}
