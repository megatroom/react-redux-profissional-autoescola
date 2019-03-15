import React from "react";
import uuid from "uuid/v1";

import AppBar from "./AppBar";
import NewStudent from "./NewStudent";
import StudentList from "./StudentList";

export default class App extends React.Component {
  state = {
    students: []
  };

  handleAdd = name => {
    this.setState(state => ({
      students: state.students.concat({ id: uuid(), name: name })
    }));
  };

  handleEdit = (id, name) => {
    this.setState(state => {
      const newStudents = state.students.slice();
      const index = newStudents.findIndex(student => student.id === id);
      newStudents[index].name = name;

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

      return {
        students: newStudents
      };
    });
  };

  handleReload = () => {
    const students = window.localStorage.getItem("students");
    this.setState({ students: JSON.parse(students) });
  };

  handleSave = () => {
    const { students } = this.state;
    window.localStorage.setItem("students", JSON.stringify(students));
  };

  render() {
    return (
      <div>
        <AppBar onReload={this.handleReload} onSave={this.handleSave} />
        <div className="container">
          <NewStudent onAdd={this.handleAdd} />
          <StudentList
            students={this.state.students}
            onMove={this.handleMove}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}
