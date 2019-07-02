import React, { Component } from 'react';
import uuid from 'uuid/v1';

import TheoryClassesContext from './TheoryClassesContext';
import { TheoryClassService } from '../../services';

class TheoryClassesProvider extends Component {
  state = {
    theoryClass: null,
    theoryClasses: [],
    isAdding: false,
    isLoading: false,
    reloadHasError: false,
    saveHasError: false
  };

  service = new TheoryClassService();

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

    const theoryClass = { id: uuid(), name: name };
    this.state.theoryClasses.push(theoryClass);

    this.service
      .save(theoryClass)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleSaveAll = theoryClasses => {
    this.setState({ isLoading: true, saveHasError: false });

    !Array.isArray(theoryClasses) && (theoryClasses = []);

    this.service
      .saveAll(theoryClasses)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleEdit = (id, name) => {
    this.setState({ isLoading: true, saveHasError: false });

    const theoryClass = { id: id, name: name };

    if (!this.state.saveHasError)
      this.service
        .update(theoryClass)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false, saveHasError: true }));
    else this.setState({ isLoading: false, saveHasError: true });
  };

  handleDelete = id => {
    this.setState({ isLoading: true, saveHasError: false });

    const index = this.state.theoryClasses.findIndex(theoryClass => theoryClass.id === id);

    index > -1 && this.state.theoryClasses.splice(index, 1);

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
        const theoryClasses = state['theoryClasses'].slice();
        const movedTheoryClass = theoryClasses.splice(index, 1)[0];

        if (direction === 'up') theoryClasses.splice(index - 1, 0, movedTheoryClass);
        else theoryClasses.splice(index + 1, 0, movedTheoryClass);

        return { theoryClasses, isLoading: true, reloadHasError: false };
      },
      () => this.handleSaveAll(this.state.theoryClasses)
    );
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    this.service
      .list()
      .then(theoryClasses => this.setState({ theoryClasses, isLoading: false }))
      .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
  };

  render() {
    return (
      <TheoryClassesContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSaveAll(this.state.theoryClasses),
          onRetry: this.handleReload,
          onMove: this.handleMove,
          onAdd: this.handleAdd,
          onSave: this.handleSave,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete
        }}>
        {this.props.children}
      </TheoryClassesContext.Provider>
    );
  }
}

export default TheoryClassesProvider;
