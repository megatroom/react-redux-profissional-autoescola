import React from "react";
import uuid from "uuid/v1";
import { BrowserRouter, Route } from "react-router-dom";

import { AppBar, NavigationDrawer } from "../components";

import Home from "./Home";
import About from "./About";
import Students from "./Students";
import TheoryClasses from "./TheoryClasses";
import Enrollments from "./Enrollments";
import StudentService from "../services/StudentService";
import TheoryClassService from "../services/TheoryClassService";

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
    saveTheoryClassesHasError: false,
    theoryClassToEnroll: null
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

  domains = () => ["Student", "TheoryClass"];

  collections = () => ["students", "theoryClasses"];

  forceValidValue = (range, value) => {
    if (!range) {
      throw new Error("The range is invalid.");
    } else if (!Array.isArray(range)) {
      throw new Error("The range type does not match an array.");
    } else if (range.length == 0) {
      throw new Error("The range is empty.");
    } else if (!value) {
      throw new Error("The value is incorrect.");
    } else if (!(typeof value === "string")) {
      throw new Error("The value type does not match a string.");
    } else if (value.trim().length == 0) {
      throw new Error("The value is an empty string.");
    } else if (!range.includes(value)) {
      throw new Error("The value is not supported.");
    }
  };

  forceValidDomain = domainName => {
    this.forceValidValue(this.domains(), domainName);
  };

  forceValidCollection = collectionName => {
    this.forceValidValue(this.collections(), collectionName);
  };

  buildNewState = (key, value) => {
    return JSON.parse(`{ "${key}": ${JSON.stringify(value)} }`);
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  handleAdding = (domain, isAdding) => {
    this.forceValidDomain(domain);
    this.setState(
      this.buildNewState(`isAdding${domain}`, new Boolean(isAdding))
    );
  };

  handleAdd = (collectionName, name) => {
    this.forceValidCollection(collectionName);

    this.setState(state => {
      const collection = state[collectionName].concat({
        id: uuid(),
        name: name
      });

      return this.buildNewState(collectionName, collection);
    });
  };

  handleEdit = (collectionName, id, name) => {
    this.setState(state => {
      const collection = state[collectionName].slice();
      const index = collection.findIndex(element => element.id === id);

      collection[index].name = name;

      return this.buildNewState(collectionName, collection);
    });
  };

  handleDelete = (collectionName, id) => {
    this.setState(state => {
      const collection = state[collectionName].slice();
      const index = collection.findIndex(element => element.id === id);

      collection.splice(index, 1);

      return this.buildNewState(collectionName, collection);
    });
  };

  handleMove = (collectionName, direction, index) => {
    this.setState(state => {
      const collection = state[collectionName].slice();
      const removedElement = collection.splice(index, 1)[0];

      if (direction === "up") collection.splice(index - 1, 0, removedElement);
      else collection.splice(index + 1, 0, removedElement);

      return this.buildNewState(collectionName, collection);
    });
  };

  handleAddingStudent = isAdding => {
    this.handleAdding("Student", isAdding);
  };

  handleAddStudent = name => {
    this.handleAdd("students", name);
    this.handleSaveStudents(this.state.students);
  };

  handleEditStudent = (id, name) => {
    this.handleEdit("students", id, name);
    this.handleSaveStudents(this.state.students);
  };

  handleDeleteStudent = id => {
    this.handleDelete("students", id);
    this.handleSaveStudents(this.state.students);
  };

  handleMoveStudent = (direction, index) => {
    this.handleMove("students", direction, index);
    this.handleSaveStudents(this.state.students);
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

  handleAddingTheoryClass = isAdding => {
    this.handleAdding("TheoryClass", isAdding);
  };

  handleAddTheoryClass = name => {
    this.handleAdd("theoryClasses", name);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
  };

  handleEditTheoryClass = (id, name) => {
    this.handleEdit("theoryClasses", id, name);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
  };

  handleDeleteTheoryClass = id => {
    this.handleDelete("theoryClasses", id);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
  };

  handleMoveTheoryClass = (direction, index) => {
    this.handleMove("theoryClasses", direction, index);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
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

  handleManageEnrollment = theoryClass => {
    this.setState({
      theoryClassToEnroll: theoryClass
    });

    if (!this.state.students) {
      this.handleReloadStudents();
    }
  };

  handleEnroll = (student, theoryClass) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const studentIndex = newStudents.findIndex(
        newStudent => newStudent.id === student.id
      );
      newStudents[studentIndex].theoryClass = theoryClass.id;

      const newTheoryClasses = state.theoryClasses.slice();
      const theoryClassIndex = newTheoryClasses.findIndex(
        newTheoryClass => newTheoryClass.id === theoryClass.id
      );

      if (!Array.isArray(newTheoryClasses[theoryClassIndex].enrollments))
        newTheoryClasses[theoryClassIndex].enrollments = [];

      newTheoryClasses[theoryClassIndex].enrollments.push(student.id);

      return {
        students: newStudents,
        theoryClasses: newTheoryClasses
      };
    });

    this.handleSaveStudents(this.state.students);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
  };

  handleUnenroll = (student, theoryClass) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const studentIndex = newStudents.findIndex(
        newStudent => newStudent.id === student.id
      );
      delete newStudents[studentIndex].theoryClass;

      const newEnrollments = theoryClass.enrollments.slice();
      const enrollmentIndex = newEnrollments.findIndex(
        enrollment => enrollment === student.id
      );
      newEnrollments.splice(enrollmentIndex, 1);

      const newTheoryClasses = state.theoryClasses.slice();
      const theoryClassIndex = newTheoryClasses.findIndex(
        newTheoryClass => newTheoryClass.id === theoryClass.id
      );
      newTheoryClasses[theoryClassIndex].enrollments = newEnrollments;

      return {
        students: newStudents,
        theoryClasses: newTheoryClasses
      };
    });

    this.handleSaveStudents(this.state.students);
    this.handleSaveTheoryClasses(this.state.theoryClasses);
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
      saveTheoryClassesHasError,
      theoryClassToEnroll
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
                    onManageEnrollment={this.handleManageEnrollment}
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
                    theoryClass={theoryClassToEnroll}
                    onEnroll={this.handleEnroll}
                    onUnenroll={this.handleUnenroll}
                    reloadHasError={reloadStudentsHasError}
                    onRetry={() => {
                      this.handleReloadStudents();
                      history.back();
                    }}
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
