import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Home/HomePage';
import TheoryClassesPage from './TheoryClasses/TheoryClassesPage';
import StudentsPage from './Students/StudentsPage';
import EnrollmentsPage from './Enrollments/EnrollmentsPage';
import SettingsPage from './Settings/SettingsPage';
import AboutPage from './About/AboutPage';
import PageNotFound from './PageNotFound/PageNotFound';

export const menu = [
  { icon: 'home', label: 'Página Inicial', path: '/' },
  { icon: 'class', label: 'Aula Teórica', path: '/theory-classes' },
  { icon: 'person', label: 'Alunos', path: '/students' },
  { icon: 'settings', label: 'Configurações', path: '/settings' },
  { icon: 'info', label: 'Sobre', path: '/about' }
];

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
  theoryClassToEnroll,
  onEnroll,
  onUnenroll,
  reloadHasError,
  onRetryEnroll
}) => (
  <Switch>
    <Route path='/' exact render={() => <HomePage onCloseMenu={onCloseMenu} />} />
    {/* <Route
      path='/theory-classes'
      exact
      render={() => (
        <TheoryClassesPage
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
    /> */}
    <Route path='/students' exact component={StudentsPage} />
    {/* <Route
      path='/enrollments'
      exact
      render={() => (
        <EnrollmentsPage
          students={students}
          theoryClass={theoryClassToEnroll}
          onEnroll={onEnroll}
          onUnenroll={onUnenroll}
          reloadHasError={reloadHasError}
          onRetry={onRetryEnroll}
        />
      )}
    /> */}
    <Route path='/settings' exact component={SettingsPage} />
    <Route path='/about' exact component={AboutPage} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
