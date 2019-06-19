import React from 'react';

import './button.scss';

const FloatButton = ({ icon, onClick }) => (
  <div className='float-button float-button__background'>
    <button className='float-button float-button--floating' onClick={onClick}>
      <i className='material-icons'>{icon}</i>
    </button>
  </div>
);

export default FloatButton;
