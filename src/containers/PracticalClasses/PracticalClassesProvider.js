import React, { Component } from 'react';
import uuid from 'uuid/v1';

import PracticalClassesContext from './PracticalClassesContext';
import { CarService, StudentService, PracticalClassService } from '../../services';

class PracticalClassesProvider extends Component {
  state = {
    practicalClass: null,
    practicalClasses: [],
    students: [],
    cars: [],
    isAdding: false,
    isLoading: false,
    reloadHasError: false,
    saveHasError: false
  };

  practicalClassService = new PracticalClassService();
  carService = new CarService();
  studentService = new StudentService();

  componentDidMount() {
    this.handleReload();
  }

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  validateCarWithTeacher(car) {
    return car.theacher && car.theacher.id && alert('O carro não possui um professor.');
  }

  validateStudentEnrollment(student) {
    if (!student) return false;

    let counter = 0;
    const { practicalClasses } = this.state;

    practicalClasses.forEach(pc => pc.student && pc.student.id === student.id && counter++);

    return counter < 10;
  }

  handleAdd = isAdding => {
    this.setState({ isAdding: isAdding });
  };

  handleSave = (student, car, date, hour) => {
    this.setState({ isLoading: true, saveHasError: false });

    const practicalClass = { id: uuid(), student, car, date, hour };
    this.state.practicalClasses.push(practicalClass);

    this.practicalClassService
      .list(student)
      .then(practicalClasses =>
        practicalClasses.length < 10
          ? this.practicalClassService
              .save(practicalClass)
              .then(() => this.setState({ isLoading: false }))
              .catch(() => this.setState({ isLoading: false, saveHasError: true }))
          : alert('Só pode ser cadastrado até 10 aulas por aluno.')
      )
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleSaveAll = practicalClasses => {
    this.setState({ isLoading: true, saveHasError: false });

    !Array.isArray(practicalClasses) && (practicalClasses = []);

    this.practicalClassService
      .saveAll(practicalClasses)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleEdit = (id, student, car, date, hour) => {
    this.setState({ isLoading: true, saveHasError: false });

    const practicalClass = { id, student, car, date, hour };

    this.practicalClassService
      .update(practicalClass)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleDelete = id => {
    this.setState({ isLoading: true, saveHasError: false });

    const index = this.state.practicalClasses.findIndex(practicalClass => practicalClass.id === id);

    index > -1 && this.state.practicalClasses.splice(index, 1);

    if (!this.state.saveHasError)
      this.practicalClassService
        .delete(id)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false, saveHasError: true }));
    else this.setState({ isLoading: false, saveHasError: true });
  };

  handleMove = (direction, index) => {
    this.setState(
      state => {
        const practicalClasses = state['practicalClasses'].slice();
        const movedTheoryClass = practicalClasses.splice(index, 1)[0];

        if (direction === 'up') practicalClasses.splice(index - 1, 0, movedTheoryClass);
        else practicalClasses.splice(index + 1, 0, movedTheoryClass);

        return { practicalClasses, isLoading: true, reloadHasError: false };
      },
      () => this.handleSaveAll(this.state.practicalClasses)
    );
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    Promise.all([this.practicalClassService.list(), this.studentService.list(), this.carService.list()])
      .then(results => {
        const practicalClasses = results[0];
        const students = results[1];
        const cars = results[2];
        this.setState({ practicalClasses, students, cars, isLoading: false });
      })
      .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
  };

  render() {
    return (
      <PracticalClassesContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSaveAll(this.state.practicalClasses),
          onRetry: this.handleReload,
          onMove: this.handleMove,
          onAdd: this.handleAdd,
          onSave: this.handleSave,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete
        }}>
        {this.props.children}
      </PracticalClassesContext.Provider>
    );
  }
}

export default PracticalClassesProvider;
