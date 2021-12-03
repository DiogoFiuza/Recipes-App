import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';

import { fetchSurprise } from '../redux/slices/surpriseRecipeSlice';

export default function ExploreFood() {
  const title = 'Explorar Comidas';
  const dispatch = useDispatch();
  const { surpriseApi } = useSelector((store) => store.surpriseRecipe);
  useEffect(() => {
    dispatch(fetchSurprise());
  }, []);
  return (
    <>
      <Header title={ title } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      {
        surpriseApi.map((id, index) => (
          <Link key={ index } to={ `/comidas/${id.idMeal}` }>
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        ))
      }
      <Footer />
    </>
  );
}
