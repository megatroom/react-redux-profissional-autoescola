import React from 'react';
import { withRouter } from 'react-router-dom';

import withSettings from '../Settings/withSettings';
import { Button, Header } from '../../components';

import './home.scss';

const HomePage = ({ selectedTheme, history, onCloseMenu }) => (
  <div className='home'>
    <Header>Serviços</Header>
    <Button
      style={selectedTheme.style}
      onClick={() => {
        onCloseMenu();
        history.push('/theory-classes');
      }}>
      <span className='home__button'>
        <i className='material-icons'>class</i>
        Aula Teórica
      </span>
    </Button>
    <Header>Cadastros</Header>
    <Button
      style={selectedTheme.style}
      onClick={() => {
        onCloseMenu();
        history.push('/students');
      }}>
      <span className='home__button'>
        <i className='material-icons'>person</i>
        Alunos
      </span>
    </Button>
  </div>
);

export default withRouter(withSettings(HomePage));
