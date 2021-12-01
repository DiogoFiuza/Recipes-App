import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleShowSearch } from '../redux/slices/showSearchSlice';
// Thomaz && Felippe

export default function Footer() {
  const dispatch = useDispatch();
  // const [showSearchBar, setShowSearchBar] = useState(false);

  // const toggleSearchBar = () => {
  //   setShowSearchBar(!showSearchBar);
  // };

  return (
    <footer className="footer" data-testid="footer">
      <Link to="/perfil">
        <img
          src="https://cdn-icons-png.flaticon.com/512/54/54342.png"
          alt="botão de perfil"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <div>
        <button type="button" onClick={ () => dispatch(toggleShowSearch()) }>
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            alt="botão de pesquisa"
            data-testid="explore-bottom-btn"
          />
        </button>

      </div>
      <Link to="/explorar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/54/54676.png"
          alt="botão mais opções"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
