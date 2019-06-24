import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EnrollmentsContext from './EnrollmentsContext';
import { StudentService, TheoryClassService } from '../../services';

class EnrollmentsProvider extends Component {
  state = { theoryClass: null, students: [], isLoading: false, reloadHasError: false, saveHasError: false };

  studentsService = new StudentService();
  theoryClassesService = new TheoryClassService();

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  componentDidMount() {
    this.handleReload();
  }

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    const { theoryClass } = this.state;

    if (theoryClass) {
      this.studentsService
        .list(theoryClass)
        .then(students => {
          if (!Array.isArray(students)) throw new Error('O sistema apresentou um estado inválido ao carregar os dados dos estudantes.');

          this.setState({ students: students, isLoading: false });
        })
        .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
    } else {
      this.setState({ students: [], isLoading: false });
    }
  };

  handleManageEnrollment = theoryClass => {
    this.setState({ theoryClass: theoryClass });
    this.handleReload();
    this.props.history.push('/enrollments');
  };

  handleEnroll = (student, theoryClass) => {
    this.setState(state => {
      if (!Array.isArray(theoryClass.enrollments)) theoryClass.enrollments = [];

      theoryClass.enrollments.push(student.id);
      student.enrollment = theoryClass.id;

      const students = Array.from(state.students);
      const index = students.findIndex(s => s.id === student.id);

      if (index > -1) students[index] = student;

      return { theoryClass: theoryClass, students: students };
    });

    this.props.onSaveStudent(student);
    this.props.onSaveTheoryClasses(theoryClasses);
  };

  handleUnenroll = (student, theoryClass) => {
    this.setState(state => {
      delete student.enrollment;

      const students = Array.from(state.students);
      const index = students.findIndex(s => s.id === student.id);

      if (index > -1) students[index] = student;

      index = theoryClass.enrollments.findIndex(e => e === student.id);

      if (index > -1) theoryClass.enrollments.splice(index, 1);

      return {
        theoryClass: theoryClass,
        students: students
      };
    });

    this.props.onSaveStudent(student);
    this.props.onSaveTheoryClasses(theoryClasses);
  };

  handleSaveAll = () => {
    this.studentsService.saveAll(this.state.students);
    this.theoryClassesService.save(this.state.theoryClass);
  };

  render() {
    return (
      <EnrollmentsContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSaveAll(this.state.theoryClasses),
          onEnroll: this.handleEnroll,
          onUnenroll: this.handleUnenroll,
          onManageEnrollment: this.handleManageEnrollment,
          onRetry: this.handleReload
        }}>
        {this.props.children}
      </EnrollmentsContext.Provider>
    );
  }
}

export default withRouter(EnrollmentsProvider);
