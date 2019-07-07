import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes, { menu } from '../Routes';
import PageLayout from '../PageLayout/PageLayout';
import SettingsProvider from '../Settings/SettingsProvider';
import StudentsProvider from '../Students/StudentsProvider';
import TheoryClassesProvider from '../TheoryClasses/TheoryClassesProvider';
import EnrollmentsProvider from '../Enrollments/EnrollmentsProvider';
import TeachersProvider from '../Teachers/TeachersProvider';
import CarProvider from '../Cars/CarsProvider';
import PracticalClassesProvider from '../PracticalClasses/PracticalClassesProvider';

export default class App extends Component {
  state = {
    isMenuOpen: false
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <BrowserRouter>
        <SettingsProvider>
          <StudentsProvider>
            <TheoryClassesProvider>
              <EnrollmentsProvider>
                <TeachersProvider>
                  <CarProvider>
                    <PracticalClassesProvider>
                      <PageLayout menu={menu} isMenuOpen={isMenuOpen} onOpenMenu={this.handleOpenMenu} onCloseMenu={this.handleCloseMenu}>
                        <Routes onCloseMenu={this.handleCloseMenu} />
                      </PageLayout>
                    </PracticalClassesProvider>
                  </CarProvider>
                </TeachersProvider>
              </EnrollmentsProvider>
            </TheoryClassesProvider>
          </StudentsProvider>
        </SettingsProvider>
      </BrowserRouter>
    );
  }
}
