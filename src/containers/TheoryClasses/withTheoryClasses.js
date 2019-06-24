import React from 'react';

import TheoryClassesContext from './TheoryClassesContext';

const withTheoryClasses = Component => props => (
  <TheoryClassesContext.Consumer>{context => <Component {...props} {...context} />}</TheoryClassesContext.Consumer>
);

export default withTheoryClasses;
