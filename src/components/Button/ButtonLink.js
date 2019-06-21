import React from 'react';
import { Link } from 'react-router-dom';

import './button.scss';

const ButtonLink = ({ children, style, to }) => (
  <div className='button__background' style={style}>
    <Link className='button' to={to}>
      {children}
    </Link>
  </div>
);

export default ButtonLink;
