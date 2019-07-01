import React, { Component } from 'react';
import uuid from 'uuid/v1';

import CarContext from './CarsContext';
import { CarService, TeacherService } from '../../services';

class CarsProvider extends Component {
  state = {
    car: null,
    cars: [],
    teachers: [],
    isAdding: false,
    isLoading: false,
    reloadHasError: false,
    saveHasError: false
  };

  carService = new CarService();
  teacherService = new TeacherService();

  componentDidMount() {
    this.handleReload();
  }

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  handleAdd = isAdding => {
    this.setState({ isAdding: isAdding });
  };

  handleSave = (name, teacher) => {
    this.setState({ isLoading: true, saveHasError: false });

    const car = { id: uuid(), name: name, teacher: teacher };
    this.state.cars.push(car);

    this.carService
      .save(car)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleSaveAll = cars => {
    this.setState({ isLoading: true, saveHasError: false });

    !Array.isArray(cars) && (cars = []);

    this.carService
      .saveAll(cars)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false, saveHasError: true }));
  };

  handleEdit = (id, name, teacher) => {
    this.setState({ isLoading: true, saveHasError: false });

    const car = { id: id, name: name, teacher: teacher };

    if (!this.state.saveHasError)
      this.carService
        .update(car)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false, saveHasError: true }));
    else this.setState({ isLoading: false, saveHasError: true });
  };

  handleDelete = id => {
    this.setState({ isLoading: true, saveHasError: false });

    const index = this.state.cars.findIndex(car => car.id === id);

    index > -1 && this.state.cars.splice(index, 1);

    if (!this.state.saveHasError)
      this.carService
        .delete(id)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false, saveHasError: true }));
    else this.setState({ isLoading: false, saveHasError: true });
  };

  handleMove = (direction, index) => {
    this.setState(
      state => {
        const cars = state['cars'].slice();
        const movedCar = cars.splice(index, 1)[0];

        if (direction === 'up') cars.splice(index - 1, 0, movedCar);
        else cars.splice(index + 1, 0, movedCar);

        return { cars, isLoading: true, reloadHasError: false };
      },
      () => this.handleSaveAll(this.state.cars)
    );
  };

  handleReload = () => {
    this.setState({ isLoading: true, reloadHasError: false });

    Promise.all([this.carService.list(), this.teacherService.list()])
      .then(results => {
        const cars = results[0];
        const teachers = results[1];
        this.setState({ cars: cars, teachers: teachers, isLoading: false });
      })
      .catch(() => this.setState({ isLoading: false, reloadHasError: true }));
  };

  render() {
    return (
      <CarContext.Provider
        value={{
          ...this.state,
          onSaveRetry: () => this.handleSaveAll(this.state.cars),
          onRetry: this.handleReload,
          onMove: this.handleMove,
          onAdd: this.handleAdd,
          onSave: this.handleSave,
          onEdit: this.handleEdit,
          onDelete: this.handleDelete
        }}>
        {this.props.children}
      </CarContext.Provider>
    );
  }
}

export default CarsProvider;
