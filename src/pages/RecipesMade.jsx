import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const mockDoneRecipes = [
  {
    id: '52898', // idMeal
    type: 'comida', // não vem da api
    area: 'British', // strArea
    category: 'Dessert', // strCategory
    alcoholicOrNot: '', // strAlcoholic
    name: 'Chelsea Buns', // strMeal
    image: 'https://www.themealdb.com/images/media/meals/vqpwrv1511723001.jpg', // strDrinkThumb
    doneDate: '11/11/2021', //  não vem da api
    tags: ['Bun', 'Baking'], // strTags (só precisa das duas primeiras)
  },
  {
    id: '16986', // idMeal
    type: 'bebida', // não vem da api
    area: '', // strArea
    category: 'Other/Unknown', // strCategory
    alcoholicOrNot: 'Alcoholic', // strAlcoholic
    name: 'Bible Belt', // strMeal
    image:
      'https://www.thecocktaildb.com/images/media/drink/6bec6v1503563675.jpg', // strDrinkThumb
    doneDate: '10/10/2020', //  não vem da api
    tags: [], // strTags (só precisa das duas primeiras)
  },
];

export default function RecipesMade() {
  const title = 'Receitas Feitas';
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [type, setType] = useState('');

  // mock
  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
  }, []);

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
    navigator.clipboard.writeText(path);
  };

  return (
    <>
      <Header title={ title } />
      <fieldset>
        <button type="button" value="" onClick={ handleClick }>
          All
        </button>
        <button type="button" value="comida" onClick={ handleClick }>
          Food
        </button>
        <button type="button" value="bebida" onClick={ handleClick }>
          Drinks
        </button>
      </fieldset>
      <main>
        {doneRecipes
          && doneRecipes
            .filter((recipe) => recipe.type.includes(type))
            .map((recipe) => {
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
                      src={ image }
                      alt="Imagem meramente ilustrativa da receita"
                      width="64px"
                    />
                    <p>{name}</p>
                  </Link>
                  {recipe.type === 'comida' && <p>{`${area} - ${category}`}</p>}
                  {recipe.type === 'bebida' && <p>{alcoholicOrNot}</p>}
                  <p>{`Feita em: ${doneDate}`}</p>
                  <p>
                    {tags.map((tag) => (
                      <button type="button" key={ tag }>
                        {tag}
                      </button>
                    ))}
                  </p>
                  <button
                    type="button"
                    onClick={ () => copyToClipboard(recipe.type, id) }
                  >
                    <img src={ shareIcon } alt="ícone de compartilhar" />
                  </button>
                </div>
              );
            })}
      </main>
    </>
  );
}

// o Endpoint usado pra colocar a receita no localStora deve ser o por nome:
// https://www.themealdb.com/api/json/v1/1/search.php?s=
