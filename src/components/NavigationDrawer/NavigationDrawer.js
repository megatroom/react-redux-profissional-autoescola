import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import MenuItem from './MenuItem';
import ButtonIcon from '../Button/ButtonIcon';

import './navigation-drawer.scss';

const NavigationDrawer = ({ menu, isOpen, onCloseMenu, style, history, location }) => (
  <div
    style={style}
    className={classNames('navigation-drawer', {
      'navigation-drawer--open': isOpen
    })}>
    <div className='navigation-drawer__head'>
      <ButtonIcon icon='close' onClick={onCloseMenu} />
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
