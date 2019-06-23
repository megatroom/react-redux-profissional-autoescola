import React, { Component } from 'react';
import uuid from 'uuid/v1';

import StudentsContext from './StudentsContext';
import { StudentService } from '../../services';

class StudentsProvider extends Component {
  state = { students: [], isAdding: false, isLoading: false, reloadHasError: false, saveHasError: false };

  service = new StudentService();

  componentDidMount() {
    this.handleReload();
  }

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  handleAdd = isAdding => {
    this.setState({ isAdding: isAdding });
  };

  handleSave = name => {
    this.setState({ isLoading: true, saveHasError: false });

    const student = { id: uuid(), name: name };
    this.state.students.push(student);

    this.service
      .save(student)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleSaveAll = students => {
    this.setState({ isLoading: true, saveHasError: false });

    !Array.isArray(students) && (students = []);

    this.service
      .saveAll(students)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleEdit = (id, name) => {
    this.setState({ isLoading: true, saveHasError: false });

    const student = { id: id, name: name };

    this.service
      .update(student)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleDelete = id => {
    this.setState({ isLoading: true, saveHasError: false });

    const index = this.state.students.findIndex(student => student.id === id);

    index > -1 && this.state.students.splice(index, 1);

    this.service
      .delete(id)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleMove = (direction, index) => {
    this.setState(
      state => {
        const students = state['students'].slice();
        const movedStudent = students.splice(index, 1)[0];

        if (direction === 'up') students.splice(index - 1, 0, movedStudent);
        else students.splice(index + 1, 0, movedStudent);

        return { students, isLoading: true, reloadHasError: false };
      },
      () => this.handleSaveAll(this.state.students)
    );
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    this.service
      .list()
      .then(students => this.setState({ students, isLoading: false }))
      .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
  };

  render() {
    return (
      <StudentsContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSaveAll(this.state.students),
          onRetry: this.handleReload,
          onMove: this.handleMove,
          onAdd: this.handleAdd,
          onSave: this.handleSave,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete
        }}>
        {this.props.children}
      </StudentsContext.Provider>
    );
  }
}

export default StudentsProvider;
