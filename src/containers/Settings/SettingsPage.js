import React from 'react';

import withSettings from './withSettings';
import { Header } from '../../components';

import './settings.scss';

const SettingsPage = ({ themes, selectedTheme, toggleTheme }) => (
  <div>
    <Header>Temas</Header>
    <div className='themes'>
      {themes.map(theme => (
        <button key={theme.key} className='themes__item' style={theme.navBar} onClick={() => toggleTheme(theme)}>
          <p>
            {theme.label}
            {theme.key === selectedTheme.key && <i className='material-icons'>check</i>}
          </p>
        </button>
      ))}
    </div>
  </div>
);

export default withSettings(SettingsPage);
