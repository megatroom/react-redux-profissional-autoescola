import React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './About/About';
import Enrollments from './Enrollments/Enrollments';
import Home from './Home/Home';
import Students from './Students/Students';
import TheoryClasses from './TheoryClasses/TheoryClasses';
import PageNotFound from './PageNotFound/PageNotFound';

const Routes = ({
  theoryClasses,
  isAddingTheoryClass,
  reloadTheoryClassHasError,
  onRetryTheoryClass,
  onAddTheoryClass,
  onAddingTheoryClass,
  onMoveTheoryClass,
  onEditTheoryClass,
  onDeleteTheoryClass,
  onManageEnrollment,
  onCloseMenu,
  students,
  isAddingStudent,
  reloadStudentHasError,
  onRetryStudent,
  onAddStudent,
  onAddingStudent,
  onMoveStudent,
  onEditStudent,
  onDeleteStudent,
  theoryClassToEnroll,
  onEnroll,
  onUnenroll,
  reloadHasError,
  onRetryEnroll
}) => (
  <Switch>
    <Route path='/' exact render={() => <Home onCloseMenu={onCloseMenu} />} />
    <Route
      path='/theory-classes'
      exact
      render={() => (
        <TheoryClasses
          theoryClasses={theoryClasses}
          isAdding={isAddingTheoryClass}
          reloadHasError={reloadTheoryClassHasError}
          onRetry={onRetryTheoryClass}
          onAdd={onAddTheoryClass}
          onAdding={onAddingTheoryClass}
          onMove={onMoveTheoryClass}
          onEdit={onEditTheoryClass}
          onDelete={onDeleteTheoryClass}
          onManageEnrollment={onManageEnrollment}
          onCloseMenu={onCloseMenu}
        />
      )}
    />
    <Route
      path='/students'
      exact
      render={() => (
        <Students
          students={students}
          isAdding={isAddingStudent}
          reloadHasError={reloadStudentHasError}
          onRetry={onRetryStudent}
          onAdd={onAddStudent}
          onAdding={onAddingStudent}
          onMove={onMoveStudent}
          onEdit={onEditStudent}
          onDelete={onDeleteStudent}
        />
      )}
    />
    <Route
      path='/enrollments'
      exact
      render={() => (
        <Enrollments
          students={students}
          theoryClass={theoryClassToEnroll}
          onEnroll={onEnroll}
          onUnenroll={onUnenroll}
          reloadHasError={reloadHasError}
          onRetry={onRetryEnroll}
        />
      )}
    />
    <Route path='/about' exact component={About} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
