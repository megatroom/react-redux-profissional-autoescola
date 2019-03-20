import React from "react";
import uuid from "uuid/v1";

import AppBar from "./AppBar";
import NewStudent from "./NewStudent";
import StudentList from "./StudentList";
import StudentService from "../services/StudentService";
import Error from "./Error";

export default class App extends React.Component {
  state = {
    students: [],
    isLoading: false,
    reloadHasError: false,
    saveHasError: false
  };

  componentDidMount() {
    this.handleReload();
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

  render() {
    const { students, isLoading, reloadHasError, saveHasError } = this.state;

    return (
      <div>
        <AppBar
          isLoading={isLoading}
          saveHasError={saveHasError}
          onSaveRetry={() => this.handleSave(students)}
        />
        <div className="container">
          {reloadHasError ? (
            <Error onRetry={this.handleReload} />
          ) : (
            <React.Fragment>
              <NewStudent onAdd={this.handleAdd} />
              <StudentList
                students={students}
                onMove={this.handleMove}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
