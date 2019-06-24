import React from 'react';

import withSettings from '../Settings/withSettings';
import withStudents from '../Students/withStudents';
import withTheoryClasses from '../TheoryClasses/withTheoryClasses';
import withEnrollments from '../Enrollments/withEnrollments';
import { AppBar, NavigationDrawer } from '../../components';

import './page-layout.scss';

const PageLayout = ({ children, selectedTheme, menu, isMenuOpen, isLoading, saveHasError, onSaveRetry, onOpenMenu, onCloseMenu }) => (
  <div>
    <AppBar
      style={selectedTheme && selectedTheme.style}
      isLoading={isLoading}
      saveHasError={saveHasError}
      onSaveRetry={onSaveRetry}
      onOpenMenu={onOpenMenu}
    />
    <div className='container'>{children}</div>
    <NavigationDrawer style={selectedTheme && selectedTheme.style} menu={menu} isOpen={isMenuOpen} onCloseMenu={onCloseMenu} />
  </div>
);

export default withSettings(withStudents(withTheoryClasses(PageLayout)));
