import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import profileIcon from '../images/profileIcon.svg';

export default function Header(props) {
  const { searchBar } = props;
  // const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedComida, setSelectedComida] = useState();
  const [selectedBebida, setSelectedBebida] = useState('');
  const { show } = useSelector((state) => state.showSearch);

  const comidaSelected = () => {
    setSelectedComida('option-categoty');
    setSelectedBebida('');
  };
  const bebidaSelected = () => {
    setSelectedComida('');
    setSelectedBebida('option-categoty');
  };

  return (
    <header>
      <div className="top-bar">
        <div className="category-selected">
          <Link
            to="/comidas"
            onClick={ comidaSelected }
            className={ selectedComida }
          >
            <h2>Comidas</h2>
          </Link>
          <Link
            to="/bebidas"
            className={ selectedBebida }
            onClick={ bebidaSelected }
          >
            <h2>Bebidas</h2>
          </Link>
        </div>

        {/* <h1 data-testid="page-title">
          {title}
        </h1> */}
        {/* {searchBar && (
          <button type="button" onClick={ toggleSearchBar }>
            <img
              data-testid="search-top-btn"
              src=""
              alt="Lupa: Botão de pesquisa"
            />
          </button>
        )} */}
      </div>
      {show && searchBar}
    </header>
  );
}

Header.propTypes = {
  searchBar: PropTypes.objectOf(PropTypes.any),
};

Header.defaultProps = {
  searchBar: null,
};
