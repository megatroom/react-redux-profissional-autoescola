import React from 'react';

import Header from '../Header/Header';
import Button from '../Button/Button';
import Center from '../Center/Center';

import './error.scss';

const Error = ({ onRetry }) => (
  <Center>
    <Header>Ops!</Header>
    <p>Ocorreu um erro inesperado ao carregar os dados.</p>
    <Button onClick={onRetry}>Tentar novamente</Button>
  </Center>
);

export default Error;
