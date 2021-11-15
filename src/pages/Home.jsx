import React from 'react';
import { useHistory } from 'react-router';
import Login from '../components/Login';
import chiquem from '../images/chiquem.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

export default function Home() {
  const history = useHistory();

  return (
    <div className="meals home">
      <button
        className="cheat"
        type="button"
        onTouchMove={ () => history.push('/comidas') }
      >
        <div className="logo">
          <button
            className="cheat"
            type="button"
            onDoubleClick={ () => history.push('/comidas') }
          >
            <img src={ chiquem } className="chiquem-logo" alt="logo" />
          </button>
        </div>

        <main className="container-login-form">
          <p className="describe">Insira email e senha para acessar</p>
          <Login />
        </main>
      </button>
    </div>
  );
}
