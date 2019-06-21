import React, { Component } from 'react';
import uuid from 'uuid/v1';

import StudentsContext from './StudentsContext';
import { StudentService } from '../../services';

class StudentsProvider extends Component {
  state = { students: [], isAdding: false, isLoading: false, reloadHasError: false, saveHasError: false };

  componentDidMount() {
    this.handleReload();
  }

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  handleAdding = isAdding => {
    this.setState({ isAdding: isAdding });
  };

  handleAdd = name => {
    this.setState(state => {
      const students = state['students'].concat({ id: uuid(), name: name });
      return { students: students };
    });

    this.handleSave(this.state.students);
  };

  handleEdit = (id, name) => {
    this.setState(state => {
      const students = state['students'].slice();
      const index = students.findIndex(student => student.id === id);

      students[index].name = name;

      return { students: students };
    });

    this.handleSave(this.state.students);
  };

  handleDelete = id => {
    this.setState(state => {
      const students = state['students'].slice();
      const index = students.findIndex(student => student.id === id);

      students.splice(index, 1);

      return { students: students };
    });

    this.handleSave(this.state.students);
  };

  handleMove = (direction, index) => {
    this.setState(state => {
      const students = state['students'].slice();
      const movedStudent = students.splice(index, 1)[0];

      if (direction === 'up') students.splice(index - 1, 0, movedStudent);
      else students.splice(index + 1, 0, movedStudent);

      return { students: students };
    });

    this.handleSave(this.state.students);
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    StudentService.load()
      .then(students => this.setState({ students, isLoading: false }))
      .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
  };

  handleSave = students => {
    this.setState({ isLoading: true, saveHasError: false });

    StudentService.save(students)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  render() {
    return (
      <StudentsContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSave(this.state.students),
          onRetry: this.handleReload,
          onAdd: this.handleAdd,
          onAdding: this.handleAdding,
          onMove: this.handleMove,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete,
        }}
      >
        {this.props.children}
      </StudentsContext.Provider>
    );
  }
}

export default StudentsProvider;
