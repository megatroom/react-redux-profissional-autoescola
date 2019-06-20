import React from 'react';
import classNames from 'classnames';

import './button.scss';

const ButtonIcon = ({ icon, disabled, classes, onClick }) => (
  <button className={classNames('button', 'button__icon', classes)} disabled={disabled} onClick={onClick}>
    <i className='material-icons'>{icon}</i>
  </button>
);

export default ButtonIcon;
