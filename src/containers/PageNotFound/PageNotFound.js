import React from 'react';

import { Header, ButtonLink, Center } from '../../components';

import Travolta from '../../images/travolta.gif';

const PageNotFound = () => (
  <Center>
    <Header>Ops!</Header>
    <div>
      <img src={Travolta} alt='John Travolta' width='200' />
    </div>
    <ButtonLink to='/'>Voltar para o início</ButtonLink>
  </Center>
);

export default PageNotFound;
