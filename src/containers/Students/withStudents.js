import React from 'react';

import StudentsContext from './StudentsContext';

const withStudents = Component => props => (
  <StudentsContext.Consumer>{context => <Component {...props} {...context} />}</StudentsContext.Consumer>
);

export default withStudents;
