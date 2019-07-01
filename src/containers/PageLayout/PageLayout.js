import React, { Fragment } from 'react';

import withSettings from '../Settings/withSettings';
import StudentsContext from '../Students/StudentsContext';
import TheoryClassesContext from '../TheoryClasses/TheoryClassesContext';
import EnrollmentsContext from '../Enrollments/EnrollmentsContext';
import TeachersContext from '../Teachers/TeachersContext';
import CarsContext from '../Cars/CarsContext';
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
                <TeachersContext.Consumer>
                  {({ isLoading: isLoadingTeachers, saveHasError: saveTeachersHasError, onSaveRetry: onSaveTeachersRetry }) => (
                    <CarsContext.Consumer>
                      {({ isLoading: isLoadingCars, saveHasError: saveCarsHasError, onSaveRetry: onSaveCarsRetry }) => (
                        <Fragment>
                          <AppBar
                            style={selectedTheme && selectedTheme.style}
                            isLoading={
                              isLoadingStudents || isLoadingTheoryClasses || isLoadingEnrollments || isLoadingTeachers || isLoadingCars
                            }
                            saveHasError={
                              saveStudentsHasError ||
                              saveTheoryClassesHasError ||
                              saveEnrollmentsHasError ||
                              saveTeachersHasError ||
                              saveCarsHasError
                            }
                            onSaveRetry={() => {
                              saveStudentsHasError && onSaveStudentsRetry();
                              saveTheoryClassesHasError && onSaveTheoryClassesRetry();
                              saveEnrollmentsHasError && onSaveEnrollmentsRetry();
                              saveTeachersHasError && onSaveTeachersRetry();
                              saveCarsHasError && onSaveCarsRetry();
                            }}
                            onOpenMenu={onOpenMenu}
                          />
                          <div className='container'>{children}</div>
                        </Fragment>
                      )}
                    </CarsContext.Consumer>
                  )}
                </TeachersContext.Consumer>
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
