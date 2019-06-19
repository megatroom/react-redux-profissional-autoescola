import React from 'react';
import classNames from 'classnames';

import './header.scss';

const Header = ({ children, centered }) => <h2 className={classNames('header', { 'header--centered': centered })}>{children}</h2>;

export default Header;
