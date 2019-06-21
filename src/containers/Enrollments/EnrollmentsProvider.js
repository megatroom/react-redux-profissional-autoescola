import React, { Component } from 'react';

import EnrollmentsContext from './EnrollmentsContext';
import { StudentService, TheoryClassService } from '../../services';

class EnrollmentsProvider extends Component {
  state = { theoryClass: null, students: [], isLoading: false, reloadHasError: false };

  // TODO Remover o carregamento da inicialização.
  componentDidMount() {
    this.handleReload();
  }

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    const availableStudents = [];

    if (this.state.theoryClass) {
      StudentService.load()
        .then(students => {
          if (!Array.isArray(students)) throw new Error('O sistema apresentou um estado inválido ao carregar os dados dos estudantes.');

          students.forEach(
            student => (!student.theoryClass || student.theoryClass == this.state.theoryClass.id) && availableStudents.push(student)
          );

          this.setState({ students: availableStudents, isLoading: false });
        })
        .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
    } else {
      this.setState({ students: availableStudents, isLoading: false });
    }
  };

  handleManageEnrollment = theoryClass => {
    this.setState({ theoryClass });
    this.handleReload();
  };

  handleEnroll = (student, theoryClass) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const studentIndex = newStudents.findIndex(newStudent => newStudent.id === student.id);
      newStudents[studentIndex].theoryClass = theoryClass.id;

      const newTheoryClasses = state.theoryClasses.slice();
      const theoryClassIndex = newTheoryClasses.findIndex(newTheoryClass => newTheoryClass.id === theoryClass.id);

      if (!Array.isArray(newTheoryClasses[theoryClassIndex].enrollments)) newTheoryClasses[theoryClassIndex].enrollments = [];

      newTheoryClasses[theoryClassIndex].enrollments.push(student.id);

      return {
        students: newStudents,
        theoryClasses: newTheoryClasses,
      };
    });

    this.handleSaveStudents(this.state.students);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
  };

  handleUnenroll = (student, theoryClass) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const studentIndex = newStudents.findIndex(newStudent => newStudent.id === student.id);
      delete newStudents[studentIndex].theoryClass;

      const newEnrollments = theoryClass.enrollments.slice();
      const enrollmentIndex = newEnrollments.findIndex(enrollment => enrollment === student.id);
      newEnrollments.splice(enrollmentIndex, 1);

      const newTheoryClasses = state.theoryClasses.slice();
      const theoryClassIndex = newTheoryClasses.findIndex(newTheoryClass => newTheoryClass.id === theoryClass.id);
      newTheoryClasses[theoryClassIndex].enrollments = newEnrollments;

      return {
        students: newStudents,
        theoryClasses: newTheoryClasses,
      };
    });

    this.handleSaveStudents(this.state.students);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
  };

  render() {
    <EnrollmentsContext.Provider></EnrollmentsContext.Provider>;
  }
}

export default EnrollmentsProvider;
