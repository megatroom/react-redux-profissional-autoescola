import React from 'react';
import { withRouter } from 'react-router-dom';

import withSettings from '../Settings/withSettings';
import { Button } from '../../components';

import './home.scss';

const HomePage = ({ selectedTheme, history, onCloseMenu }) => (
  <div className='home'>
    <h2>Serviços</h2>
    <Button
      style={selectedTheme.style}
      onClick={() => {
        onCloseMenu();
        history.push('/theory-classes');
      }}
    >
      <span className='home__button'>
        <i className='material-icons'>class</i>
        Aula Teórica
      </span>
    </Button>
    <h2>Cadastros</h2>
    <Button
      style={selectedTheme.style}
      onClick={() => {
        onCloseMenu();
        history.push('/students');
      }}
    >
      <span className='home__button'>
        <i className='material-icons'>person</i>
        Alunos
      </span>
    </Button>
  </div>
);

export default withRouter(withSettings(HomePage));
