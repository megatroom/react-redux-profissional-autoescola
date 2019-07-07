import React, { Fragment } from 'react';

import withSettings from '../Settings/withSettings';
import StudentsContext from '../Students/StudentsContext';
import TheoryClassesContext from '../TheoryClasses/TheoryClassesContext';
import PracticalClassesContext from '../PracticalClasses/PracticalClassesContext';
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
                        <PracticalClassesContext.Consumer>
                          {({
                            isLoading: isLoadingPracticalClasses,
                            saveHasError: savePracticalClassesHasError,
                            onSaveRetry: onSavePracticalClassesRetry
                          }) => (
                            <Fragment>
                              <AppBar
                                style={selectedTheme && selectedTheme.style}
                                isLoading={
                                  isLoadingStudents ||
                                  isLoadingTheoryClasses ||
                                  isLoadingEnrollments ||
                                  isLoadingTeachers ||
                                  isLoadingCars ||
                                  isLoadingPracticalClasses
                                }
                                saveHasError={
                                  saveStudentsHasError ||
                                  saveTheoryClassesHasError ||
                                  saveEnrollmentsHasError ||
                                  saveTeachersHasError ||
                                  saveCarsHasError ||
                                  savePracticalClassesHasError
                                }
                                onSaveRetry={() => {
                                  saveStudentsHasError && onSaveStudentsRetry();
                                  saveTheoryClassesHasError && onSaveTheoryClassesRetry();
                                  saveEnrollmentsHasError && onSaveEnrollmentsRetry();
                                  saveTeachersHasError && onSaveTeachersRetry();
                                  saveCarsHasError && onSaveCarsRetry();
                                  savePracticalClassesHasError && onSavePracticalClassesRetry();
                                }}
                                onOpenMenu={onOpenMenu}
                              />
                              <div className='container'>{children}</div>
                            </Fragment>
                          )}
                        </PracticalClassesContext.Consumer>
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
