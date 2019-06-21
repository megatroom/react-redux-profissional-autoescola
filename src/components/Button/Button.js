import React from 'react';

import './button.scss';

const Button = ({ children, style, onClick }) => (
  <div className='button__background' style={style}>
    <button className='button' onClick={onClick}>
      {children}
    </button>
  </div>
);

export default Button;
