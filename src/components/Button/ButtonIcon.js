import React from 'react';

import './button.scss';

const ButtonIcon = ({ icon, disabled, onClick }) => (
  <button className='button button__icon' disabled={disabled} onClick={onClick}>
    <i className='material-icons'>{icon}</i>
  </button>
);

export default ButtonIcon;
