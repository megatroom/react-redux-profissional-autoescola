import React from 'react';

import withSettings from '../Settings/withSettings';
import withEnrollments from './withEnrollments';
import { EnrollmentList, Error, Header } from '../../components';

const EnrollmentsPage = ({ selectedTheme, theoryClass, students, reloadHasError, onEnroll, onUnenroll, onRetry }) => {
  if (reloadHasError || theoryClass == null) return <Error style={selectedTheme && selectedTheme.style} onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='students__container'>
        <Header>{theoryClass.name}</Header>
      </div>
      <EnrollmentList students={students} theoryClass={theoryClass} onEnroll={onEnroll} onUnenroll={onUnenroll} />
    </React.Fragment>
  );
};

export default withSettings(withEnrollments(EnrollmentsPage));
