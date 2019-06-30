import React from 'react';

import TeachersContext from './TeachersContext';

const withTeachers = Component => props => (
  <TeachersContext.Consumer>{context => <Component {...props} {...context} />}</TeachersContext.Consumer>
);

export default withTeachers;
