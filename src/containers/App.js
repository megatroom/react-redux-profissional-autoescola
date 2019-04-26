import React from "react";
import uuid from "uuid/v1";
import { BrowserRouter, Route } from "react-router-dom";

import AppBar from "../components/AppBar";
import NavigationDrawer from "../components/NavigationDrawer";
import Home from "./Home";
import About from "./About";
import Students from "./Students";
import TheoryClasses from "./TheoryClasses";
import StudentService from "../services/StudentService";
import TheoryClassService from "../services/TheoryClassService";
import Enrollments from "./Enrollments";

export default class App extends React.Component {
  state = {
    students: [],
    theoryClasses: [],
    isMenuOpen: false,
    isAddingStudent: false,
    isLoadingStudents: false,
    reloadStudentsHasError: false,
    saveStudentsHasError: false,
    isAddingTheoryClass: false,
    isLoadingTheoryClasses: false,
    reloadTheoryClassesHasError: false,
    saveTheoryClassesHasError: false
  };

  componentDidMount() {
    this.handleReloadStudents();
    this.handleReloadTheoryClasses();
  }

  componentDidCatch() {
    this.setState({
      reloadStudentsHasError: true,
      reloadTheoryClassesHasError: true
    });
  }

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  handleAddingStudent = isAddingStudent => {
    this.setState({
      isAddingStudent: isAddingStudent
    });
  };

  handleAddStudent = name => {
    this.setState(state => {
      const students = state.students.concat({
        id: uuid(),
        name: name
      });
      this.handleSaveStudents(students);
      return { students };
    });
  };

  handleEditStudent = (id, name) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const index = newStudents.findIndex(student => student.id === id);
      newStudents[index].name = name;

      this.handleSaveStudents(newStudents);

      return {
        students: newStudents
      };
    });
  };

  handleDeleteStudent = id => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const index = newStudents.findIndex(student => student.id === id);
      newStudents.splice(index, 1);

      this.handleSaveStudents(newStudents);

      return {
        students: newStudents
      };
    });
  };

  handleMoveStudent = (direction, index) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const removedStudent = newStudents.splice(index, 1)[0];

      if (direction === "up") newStudents.splice(index - 1, 0, removedStudent);
      else newStudents.splice(index + 1, 0, removedStudent);

      this.handleSaveStudents(newStudents);

      return {
        students: newStudents
      };
    });
  };

  handleReloadStudents = () => {
    this.setState({
      isLoadingStudents: true,
      reloadStudentsHasError: false
    });

    StudentService.load()
      .then(students =>
        this.setState({
          students,
          isLoadingStudents: false
        })
      )
      .catch(() =>
        this.setState({
          isLoadingStudents: false,
          reloadStudentsHasError: true
        })
      );
  };

  handleSaveStudents = students => {
    this.setState({
      isLoadingStudents: true,
      saveStudentsHasError: false
    });

    StudentService.save(students)
      .then(() =>
        this.setState({
          isLoadingStudents: false
        })
      )
      .catch(() =>
        this.setState({
          isLoadingStudents: false,
          saveStudentsHasError: true
        })
      );
  };

  handleAddingTheoryClass = isAddingTheoryClass => {
    this.setState({
      isAddingTheoryClass: isAddingTheoryClass
    });
  };

  handleAddTheoryClass = name => {
    this.setState(state => {
      const theoryClasses = state.theoryClasses.concat({
        id: uuid(),
        name: name
      });
      this.handleSaveTheoryClasses(theoryClasses);
      return { theoryClasses: theoryClasses };
    });
  };

  handleEditTheoryClass = (id, name) => {
    this.setState(state => {
      const newTheoryClasses = state.theoryClasses.slice();
      const index = newTheoryClasses.findIndex(
        theoryClass => theoryClass.id === id
      );
      newTheoryClasses[index].name = name;

      this.handleSaveTheoryClasses(newTheoryClasses);

      return {
        theoryClasses: newTheoryClasses
      };
    });
  };

  handleDeleteTheoryClass = id => {
    this.setState(state => {
      const newTheoryClasses = state.theoryClasses.slice();
      const index = newTheoryClasses.findIndex(
        theoryClass => theoryClass.id === id
      );
      newTheoryClasses.splice(index, 1);

      this.handleSaveTheoryClasses(newTheoryClasses);

      return {
        theoryClasses: newTheoryClasses
      };
    });
  };

  handleMoveTheoryClass = (direction, index) => {
    this.setState(state => {
      const newTheoryClasses = state.theoryClasses.slice();
      const removedTheoryClass = newTheoryClasses.splice(index, 1)[0];

      if (direction === "up")
        newTheoryClasses.splice(index - 1, 0, removedTheoryClass);
      else newTheoryClasses.splice(index + 1, 0, removedTheoryClass);

      this.handleSaveTheoryClasses(newTheoryClasses);

      return {
        theoryClasses: newTheoryClasses
      };
    });
  };

  handleReloadTheoryClasses = () => {
    this.setState({
      isLoadingTheoryClasses: true,
      reloadTheoryClassesHasError: false
    });

    TheoryClassService.load()
      .then(theoryClasses =>
        this.setState({
          theoryClasses: theoryClasses,
          isLoadingTheoryClasses: false
        })
      )
      .catch(() =>
        this.setState({
          isLoadingTheoryClasses: false,
          reloadTheoryClassesHasError: true
        })
      );
  };

  handleSaveTheoryClasses = theoryClasses => {
    this.setState({
      isLoadingTheoryClasses: true,
      saveTheoryClassesHasError: false
    });

    TheoryClassService.save(theoryClasses)
      .then(() =>
        this.setState({
          isLoadingTheoryClasses: false
        })
      )
      .catch(() =>
        this.setState({
          isLoadingTheoryClasses: false,
          saveTheoryClassesHasError: true
        })
      );
  };

  render() {
    const {
      isMenuOpen,
      students,
      isAddingStudent,
      isLoadingStudents,
      reloadStudentsHasError,
      saveStudentsHasError,
      theoryClasses,
      isAddingTheoryClass,
      isLoadingTheoryClasses,
      reloadTheoryClassesHasError,
      saveTheoryClassesHasError
    } = this.state;

    return (
      <BrowserRouter>
        <div>
          <AppBar
            isLoading={isLoadingStudents || isLoadingTheoryClasses}
            saveHasError={saveStudentsHasError || saveTheoryClassesHasError}
            onSaveRetry={() => {
              if (saveStudentsHasError) {
                this.handleSaveStudents(students);
              }

              if (saveTheoryClassesHasError) {
                this.handleSaveTheoryClasses(theoryClasses);
              }
            }}
            onOpenMenu={this.handleOpenMenu}
          />
          <div className="container">
            <React.Fragment>
              <Route
                path="/"
                exact
                render={() => <Home onCloseMenu={this.handleCloseMenu} />}
              />
              <Route
                path="/theory-classes"
                exact
                render={() => (
                  <TheoryClasses
                    theoryClasses={theoryClasses}
                    isAdding={isAddingTheoryClass}
                    reloadHasError={reloadTheoryClassesHasError}
                    onRetry={this.handleReloadTheoryClasses}
                    onAdd={this.handleAddTheoryClass}
                    onAdding={this.handleAddingTheoryClass}
                    onMove={this.handleMoveTheoryClass}
                    onEdit={this.handleEditTheoryClass}
                    onDelete={this.handleDeleteTheoryClass}
                    onCloseMenu={this.handleCloseMenu}
                  />
                )}
              />
              <Route
                path="/students"
                exact
                render={() => (
                  <Students
                    students={students}
                    isAdding={isAddingStudent}
                    reloadHasError={reloadStudentsHasError}
                    onRetry={this.handleReloadStudents}
                    onAdd={this.handleAddStudent}
                    onAdding={this.handleAddingStudent}
                    onMove={this.handleMoveStudent}
                    onEdit={this.handleEditStudent}
                    onDelete={this.handleDeleteStudent}
                  />
                )}
              />
              <Route
                path="/enrollments"
                exact
                render={() => (
                  <Enrollments
                    students={students}
                    reloadHasError={reloadStudentsHasError}
                    onRetry={this.handleReloadStudents}
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
