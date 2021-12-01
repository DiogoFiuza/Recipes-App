import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setOption } from '../redux/slices/searchBarSlice';
import { toggleShowSearch } from '../redux/slices/showSearchSlice';

// const container = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

export default function SearchBar({ handleSubmit }) {
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.searchBar);

  const submitted = () => {
    handleSubmit();
    dispatch(toggleShowSearch());
  };

  const handleChange = (e) => {
    dispatch(setOption(e.target.value));
  };

  /// Bug no radio button
  return (
    <div className="search-div">
      <button
        type="button"
        onClick={ () => dispatch(toggleShowSearch()) }
        className="closeSearch"
      >
        X
      </button>
      <div>
        <fieldset>
          <label htmlFor="ingredient">
            <input
              data-testid="ingredient-search-radio"
              checked
              type="radio"
              name="option"
              value="ingredient"
              id="ingredient"
              onChange={ handleChange }
            />
            Ingrediente
          </label>
          <label data-testid="name-search-radio" htmlFor="name">
            <input
              type="radio"
              name="option"
              value="name"
              id="name"
              onChange={ handleChange }
            />
            Nome
          </label>
          <label data-testid="first-letter-search-radio" htmlFor="firstLetter">
            <input
              type="radio"
              name="option"
              value="firstLetter"
              id="firstLetter"
              onChange={ handleChange }
            />
            Primeira Letra
          </label>
        </fieldset>
      </div>
      <div>
        <fieldset>
          <input
            data-testid="search-input"
            type="text"
            placeholder="Buscar receita"
            value={ query }
            onChange={ (e) => {
              dispatch(setQuery(e.target.value));
            } }
          />
          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ submitted }
          >
            Buscar
          </button>
        </fieldset>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
