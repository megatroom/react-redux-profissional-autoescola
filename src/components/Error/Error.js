import React from 'react';

import Header from '../Header/Header';
import Button from '../Button/Button';
import Center from '../Center/Center';

import './error.scss';

const Error = ({ style, onRetry }) => (
  <Center>
    <Header>Ops!</Header>
    <p>Ocorreu um erro inesperado ao carregar os dados.</p>
    <Button style={style} onClick={onRetry}>
      Tentar novamente
    </Button>
  </Center>
);

export default Error;
