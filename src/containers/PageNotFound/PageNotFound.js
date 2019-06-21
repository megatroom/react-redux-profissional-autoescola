import React from 'react';

import withSettings from '../Settings/withSettings';
import { Header, ButtonLink, Center } from '../../components';

import Travolta from '../../images/travolta.gif';

const PageNotFound = ({ selectedTheme }) => (
  <Center>
    <Header>Ops!</Header>
    <div>
      <img src={Travolta} alt='John Travolta' width='200' />
    </div>
    <ButtonLink style={selectedTheme.style} to='/'>
      Voltar para o início
    </ButtonLink>
  </Center>
);

export default withSettings(PageNotFound);
