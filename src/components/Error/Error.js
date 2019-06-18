import React from 'react';

import Button from '../Button/Button';

import './error.scss';

const Error = ({ onRetry }) => (
  <div className='error'>
    <h1>Ops!</h1>
    <p>Ocorreu um erro inesperado ao carregar os dados.</p>
    <Button onClick={onRetry}>Tentar novamente</Button>
  </div>
);

export default Error;
