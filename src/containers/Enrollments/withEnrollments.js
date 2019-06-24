import React from 'react';

import EnrollmentsContext from './EnrollmentsContext';

const withEnrollments = Component => props => (
  <EnrollmentsContext.Consumer>{context => <Component {...props} {...context} />}</EnrollmentsContext.Consumer>
);

export default withEnrollments;
