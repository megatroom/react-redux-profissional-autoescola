import React from 'react';
import { withRouter } from 'react-router-dom';

import './home.scss';

const Home = ({ history, onCloseMenu }) => (
  <div className='home'>
    <h2>Serviços</h2>
    <div className='home-container'>
      <button
        className='home__button'
        onClick={() => {
          onCloseMenu();
          history.push('/theory-classes');
        }}>
        <i className='material-icons'>class</i>Aula Teórica
      </button>
    </div>
    <h2>Cadastros</h2>
    <div className='home-container'>
      <button
        className='home__button'
        onClick={() => {
          onCloseMenu();
          history.push('/students');
        }}>
        <i className='material-icons'>person</i>
        Alunos
      </button>
    </div>
  </div>
);

export default withRouter(Home);
