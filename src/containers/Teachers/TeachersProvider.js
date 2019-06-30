import React, { Component } from 'react';
import uuid from 'uuid/v1';

import TeachersContext from './TeachersContext';
import { TeacherService } from '../../services';

class TeachersProvider extends Component {
  state = { teachers: [], isAdding: false, isLoading: false, reloadHasError: false, saveHasError: false };

  service = new TeacherService();

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

    const teacher = { id: uuid(), name: name };
    this.state.teachers.push(teacher);

    this.service
      .save(teacher)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleSaveAll = teachers => {
    this.setState({ isLoading: true, saveHasError: false });

    !Array.isArray(teachers) && (teachers = []);

    this.service
      .saveAll(teachers)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleEdit = (id, name) => {
    this.setState({ isLoading: true, saveHasError: false });

    const teacher = { id: id, name: name };

    if (!this.state.saveHasError)
      this.service
        .update(teacher)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false, saveHasError: true }));
    else this.setState({ isLoading: false, saveHasError: true });
  };

  handleDelete = id => {
    this.setState({ isLoading: true, saveHasError: false });

    const index = this.state.teachers.findIndex(teacher => teacher.id === id);

    index > -1 && this.state.teachers.splice(index, 1);

    if (!this.state.saveHasError)
      this.service
        .delete(id)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false, saveHasError: true }));
    else this.setState({ isLoading: false, saveHasError: true });
  };

  handleMove = (direction, index) => {
    this.setState(
      state => {
        const teachers = state['teachers'].slice();
        const movedTeacher = teachers.splice(index, 1)[0];

        if (direction === 'up') teachers.splice(index - 1, 0, movedTeacher);
        else teachers.splice(index + 1, 0, movedTeacher);

        return { teachers, isLoading: true, reloadHasError: false };
      },
      () => this.handleSaveAll(this.state.teachers)
    );
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    this.service
      .list()
      .then(teachers => this.setState({ teachers, isLoading: false }))
      .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
  };

  render() {
    return (
      <TeachersContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSaveAll(this.state.teachers),
          onRetry: this.handleReload,
          onMove: this.handleMove,
          onAdd: this.handleAdd,
          onSave: this.handleSave,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete
        }}>
        {this.props.children}
      </TeachersContext.Provider>
    );
  }
}

export default TeachersProvider;
