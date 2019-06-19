import React from 'react';

import SettingsContext from './SettingsContext';
import { Header } from '../../components';

import './settings.scss';

const themes = [
  { key: 'default', label: 'Padrão' },
  { key: 'classic', label: 'Clássico', colorPrimary: 'maroon' }
];

const SettingsPage = () => (
  <div>
    <Header>Temas</Header>
    <SettingsContext.Consumer>
      {({ theme: selectedTheme, toggleTheme }) => (
        <div className='themes'>
          {themes.map(theme => (
            <button
              key={theme.key}
              className='themes__item'
              style={{ backgroundColor: theme.colorPrimary }}
              onClick={() => toggleTheme(theme)}>
              <p>
                {theme.label}
                {theme.key === selectedTheme.key && <i className='material-icons'>check</i>}
              </p>
            </button>
          ))}
        </div>
      )}
    </SettingsContext.Consumer>
  </div>
);

export default SettingsPage;
