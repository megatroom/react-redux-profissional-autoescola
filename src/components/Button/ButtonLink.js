import React from 'react';
import { Link } from 'react-router-dom';

import './button.scss';

const ButtonLink = ({ children, to }) => (
  <Link className='button' to={to}>
    {children}
  </Link>
);

export default ButtonLink;
