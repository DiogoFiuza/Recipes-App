import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login-form.css';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoginValid = () => {
    const MIN_LENGTH = 6;
    const isPasswordValid = password.length > MIN_LENGTH;
    const parseEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isEmailValid = parseEmail.test(email);
    return isEmailValid && isPasswordValid;
  };

  const isDisabled = !isLoginValid();

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
      }),
    );
    history.push('/comidas');
  };

  return (
    <form>
      <fieldset className="container">
        <div className="box">
          <p>Email</p>
          <input
            data-testid="email-input"
            type="email"
            placeholder="email@email.com"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            className="input"
          />
        </div>

        <div className="box">
          <p>Senha</p>
          <input
            data-testid="password-input"
            type="password"
            placeholder="senha"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            className="input"
          />
        </div>

        <button
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          type="button"
          onClick={ handleSubmit }
          className="input box submitForm"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={ handleSubmit }
          className="input box especialButton "
        >
          Estou com problemas para acessar
        </button>

      </fieldset>
    </form>
  );
}
