import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrinkDetails from './pages/DrinkDetails';
import DrinkProgress from './pages/DrinkProgress';
import DrinkRecipes from './pages/DrinkRecipes';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFood from './pages/ExploreFood';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreFoodsByOrigin from './pages/ExploreFoodsByOrigin';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/FoodDetails';
import FoodProgress from './pages/FoodProgress';
import FoodRecipes from './pages/FoodRecipes';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByOrigin } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/comidas" component={ FoodRecipes } />
      <Route exact path="/bebidas" component={ DrinkRecipes } />
      <Route exact path="/" component={ Home } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
