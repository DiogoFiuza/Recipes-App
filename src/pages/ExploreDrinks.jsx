import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchSurpriseDrinks } from '../redux/slices/surpriseRecipeSlice';

export default function ExploreDrinks() {
  const title = 'Explorar Bebidas';
  const dispatch = useDispatch();
  const { surpriseDrinksApi } = useSelector((store) => store.surpriseRecipe);
  useEffect(() => {
    dispatch(fetchSurpriseDrinks());
  }, []);
  return (
    <>
      <Header title={ title } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      {
        surpriseDrinksApi.map((id, index) => (
          <Link key={ index } to={ `/bebidas/${id.idDrink}` }>
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
