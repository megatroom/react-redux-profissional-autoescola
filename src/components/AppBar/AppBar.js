import React from 'react';

import SettingsContext from '../../containers/Settings/SettingsContext';

import './app-bar.scss';

const AppBar = ({ isLoading, saveHasError, onSaveRetry, onOpenMenu }) => (
  <SettingsContext.Consumer>
    {({ theme }) => (
      <div className='app-bar' style={{ backgroundColor: theme.colorPrimary }}>
        <div className='app-bar__container'>
          <button className='app-bar__action' onClick={onOpenMenu}>
            <i className='material-icons'>menu</i>
          </button>
          <span className='app-bar__brand'>
            <h1>Autoescola Senna</h1>
          </span>
          {isLoading && (
            <div className='app-bar__action--rotation'>
              <i className='material-icons'>refresh</i>
            </div>
          )}
          {saveHasError && (
            <button className='app-bar__action app-bar__action--danger' onClick={onSaveRetry}>
              <i className='material-icons'>cloud_off</i>
            </button>
          )}
        </div>
      </div>
    )}
  </SettingsContext.Consumer>
);

export default AppBar;
