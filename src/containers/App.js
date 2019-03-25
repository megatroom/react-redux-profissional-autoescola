import React from "react";
import uuid from "uuid/v1";
import { BrowserRouter, Route } from "react-router-dom";

import AppBar from "../components/AppBar";
import NavigationDrawer from "../components/NavigationDrawer";
import About from "./About";
import Students from "./Students";
import StudentService from "../services/StudentService";

export default class App extends React.Component {
  state = {
    students: [],
    isLoading: false,
    reloadHasError: false,
    saveHasError: false,
    isMenuOpen: false
  };

  componentDidMount() {
    this.handleReload();
  }

  componentDidCatch() {
    this.setState({ reloadHasError: true });
  }

  handleAdd = name => {
    this.setState(state => {
      const students = state.students.concat({ id: uuid(), name: name });
      this.handleSave(students);
      return { students };
    });
  };

  handleEdit = (id, name) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const index = newStudents.findIndex(student => student.id === id);
      newStudents[index].name = name;

      this.handleSave(newStudents);

      return {
        students: newStudents
      };
    });
  };

  handleDelete = id => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const index = newStudents.findIndex(student => student.id === id);
      newStudents.splice(index, 1);

      this.handleSave(newStudents);

      return {
        students: newStudents
      };
    });
  };

  handleMove = (direction, index) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const removedStudent = newStudents.splice(index, 1)[0];

      if (direction === "up") newStudents.splice(index - 1, 0, removedStudent);
      else newStudents.splice(index + 1, 0, removedStudent);

      this.handleSave(newStudents);

      return {
        students: newStudents
      };
    });
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

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const {
      students,
      isLoading,
      isMenuOpen,
      reloadHasError,
      saveHasError
    } = this.state;

    return (
      <BrowserRouter>
        <div>
          <AppBar
            isLoading={isLoading}
            saveHasError={saveHasError}
            onSaveRetry={() => this.handleSave(students)}
            onOpenMenu={this.handleOpenMenu}
          />
          <div className="container">
            <React.Fragment>
              <Route
                path="/"
                exact
                render={props => (
                  <Students
                    students={students}
                    reloadHasError={reloadHasError}
                    onRetry={this.handleReload}
                    onAdd={this.handleAdd}
                    onMove={this.handleMove}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}
                  />
                )}
              />
              <Route path="/about" exact component={About} />
            </React.Fragment>
          </div>
          <NavigationDrawer
            isOpen={isMenuOpen}
            onCloseMenu={this.handleCloseMenu}
          />
        </div>
      </BrowserRouter>
    );
  }
}
