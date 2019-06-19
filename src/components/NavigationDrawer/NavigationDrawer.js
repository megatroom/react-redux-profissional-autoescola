import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import MenuItem from './MenuItem';

import './navigation-drawer.scss';

const NavigationDrawer = ({ menu, isOpen, onCloseMenu, history, location }) => (
  <div
    className={classNames('navigation-drawer', {
      'navigation-drawer--open': isOpen
    })}>
    <div className='navigation-drawer__head'>
      <button className='navigation-drawer__head__button' onClick={onCloseMenu}>
        <i className='material-icons'>close</i>
      </button>
    </div>

    <div className='navigation-drawer__menu'>
      {menu.map(item => (
        <MenuItem
          key={item.icon}
          icon={item.icon}
          label={item.label}
          isActive={location.pathname === item.path}
          onClick={() => {
            onCloseMenu();
            history.push(item.path);
          }}
        />
      ))}
    </div>
  </div>
);

export default withRouter(NavigationDrawer);
