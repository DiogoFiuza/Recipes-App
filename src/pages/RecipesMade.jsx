import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

export default function RecipesMade() {
  const title = 'Receitas Feitas';
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    const doneRecipesFromLocalStorage = JSON.parse(
      localStorage.getItem('doneRecipes'),
    );
    setDoneRecipes(doneRecipesFromLocalStorage);
  }, []);

  const handleClick = (e) => {
    setType(e.target.value);
  };

  // Copiar informação para a área de transferência, src: https://stackoverflow.com/a/52033479
  const copyToClipboard = (recipeType, id) => {
    const path = `http://localhost:3000/${recipeType}s/${id}`;
    copy(path);
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
        {doneRecipes
          && doneRecipes
            .filter((recipe) => recipe.type.includes(type))
            .map((recipe, index) => {
              const {
                id,
                area,
                category,
                alcoholicOrNot,
                name,
                image,
                doneDate,
                tags,
              } = recipe;
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
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    {`Feita em: ${doneDate}`}
                  </p>
                  <p>
                    {tags.map((tag) => (
                      <button
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        type="button"
                        key={ tag }
                      >
                        {tag}
                      </button>
                    ))}
                  </p>
                  <button
                    className="share-button"
                    type="button"
                    onClick={ () => copyToClipboard(recipe.type, id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="ícone de compartilhar"
                    />
                  </button>
                </div>
              );
            })}
      </main>
    </>
  );
}
