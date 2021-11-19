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
          src="https://cdn-icons.flaticon.com/png/512/3311/premium/3311746.png?token=exp=1637200142~hmac=c4072d9cbd9baebc9f375ef89cd95a5b"
          alt="botão de perfil"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <div>
        <button type="button" onClick={ () => dispatch(toggleShowSearch()) }>
          <img
            src="https://cdn-icons.flaticon.com/png/512/2989/premium/2989907.png?token=exp=1637200210~hmac=cfca4ec21a54fae7a576bd459f698412"
            alt="botão de pesquisa"
            data-testid="explore-bottom-btn"
          />
        </button>

      </div>
      <Link to="/explorar">
        <img
          src="https://cdn-icons.flaticon.com/png/512/2516/premium/2516745.png?token=exp=1637200294~hmac=84a65fe4fae0e897de4168f44d77f1e7"
          alt="botão mais opções"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
