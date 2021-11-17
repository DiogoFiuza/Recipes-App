import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const title = 'Receitas Favoritas';

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    const doneRecipesFromLocalStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    setFavoriteRecipes(doneRecipesFromLocalStorage);
  }, []);

  const handleClick = (e) => {
    setType(e.target.value);
  };

  const removeFavorite = (id) => {
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  };

  // Copiar informação para a área de transferência, src: https://stackoverflow.com/a/52033479
  const copyToClipboard = (e, recipeType, id) => {
    const path = `http://localhost:3000/${recipeType}s/${id}`;
    copy(path);
    const span = '<span>Link copiado!</span>';
    e.target.parentNode.innerHTML = span;
  };

  return (
    <>
      <Header title={ title } />
      <fieldset>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value=""
          onClick={ handleClick }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="comida"
          onClick={ handleClick }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="bebida"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </fieldset>
      <main>
        {favoriteRecipes
          && favoriteRecipes
            .filter((recipe) => recipe.type.includes(type))
            .map((recipe, index) => {
              const { id, area, category, alcoholicOrNot, name, image } = recipe;
              return (
                <div key={ id }>
                  <Link to={ `/${recipe.type}s/${id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ image }
                      alt="Imagem meramente ilustrativa da receita"
                      width="64px"
                    />
                    <p data-testid={ `${index}-horizontal-name` }>{name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.type === 'comida'
                      ? `${area} - ${category}`
                      : alcoholicOrNot}
                  </p>
                  <button
                    className="share-button"
                    type="button"
                    onClick={ (e) => copyToClipboard(e, recipe.type, id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="ícone de compartilhar"
                    />
                  </button>
                  <button
                    className="favorite-button"
                    type="button"
                    onClick={ () => removeFavorite(id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="ícone de favorito"
                    />
                  </button>
                </div>
              );
            })}
      </main>
    </>
  );
}
