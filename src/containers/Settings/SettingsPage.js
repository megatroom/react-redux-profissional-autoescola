import React, { Fragment } from 'react';

import withSettings from './withSettings';
import { Header, Button } from '../../components';

import './settings.scss';

const SettingsPage = ({ themes, selectedTheme, toggleTheme }) => (
  <Fragment>
    <Header>Temas</Header>
    <div className='themes'>
      {themes.map(theme => (
        <div key={theme.key} className='themes__box'>
          <Button style={theme.style} onClick={() => toggleTheme(theme)}>
            <p className='themes__item'>
              {theme.label}
              {theme.key === selectedTheme.key && <i className='material-icons'>check</i>}
            </p>
          </Button>
        </div>
      ))}
    </div>
  </Fragment>
);

export default withSettings(SettingsPage);
