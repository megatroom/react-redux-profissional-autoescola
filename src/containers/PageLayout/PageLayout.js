import React, { Fragment } from 'react';

import withSettings from '../Settings/withSettings';
import StudentsContext from '../Students/StudentsContext';
import TheoryClassesContext from '../TheoryClasses/TheoryClassesContext';
import EnrollmentsContext from '../Enrollments/EnrollmentsContext';
import { AppBar, NavigationDrawer } from '../../components';

import './page-layout.scss';

const PageLayout = ({ children, selectedTheme, menu, isMenuOpen, onOpenMenu, onCloseMenu }) => (
  <div>
    <StudentsContext.Consumer>
      {({ isLoading: isLoadingStudents, saveHasError: saveStudentsHasError, onSaveRetry: onSaveStudentsRetry }) => (
        <TheoryClassesContext.Consumer>
          {({ isLoading: isLoadingTheoryClasses, saveHasError: saveTheoryClassesHasError, onSaveRetry: onSaveTheoryClassesRetry }) => (
            <EnrollmentsContext.Consumer>
              {({ isLoading: isLoadingEnrollments, saveHasError: saveEnrollmentsHasError, onSaveRetry: onSaveEnrollmentsRetry }) => (
                <Fragment>
                  <AppBar
                    style={selectedTheme && selectedTheme.style}
                    isLoading={isLoadingStudents || isLoadingTheoryClasses || isLoadingEnrollments}
                    saveHasError={saveStudentsHasError || saveTheoryClassesHasError || saveEnrollmentsHasError}
                    onSaveRetry={() => {
                      saveStudentsHasError && onSaveStudentsRetry();
                      saveTheoryClassesHasError && onSaveTheoryClassesRetry();
                      saveEnrollmentsHasError && onSaveEnrollmentsRetry();
                    }}
                    onOpenMenu={onOpenMenu}
                  />
                  <div className='container'>{children}</div>
                </Fragment>
              )}
            </EnrollmentsContext.Consumer>
          )}
        </TheoryClassesContext.Consumer>
      )}
    </StudentsContext.Consumer>
    <NavigationDrawer style={selectedTheme && selectedTheme.style} menu={menu} isOpen={isMenuOpen} onCloseMenu={onCloseMenu} />
  </div>
);

export default withSettings(PageLayout);
