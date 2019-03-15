import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import uuid from "uuid/v1";

import "./index.scss";
import { inherits } from "util";

class App extends React.Component {
  state = {
    students: [
      { id: 1, name: "Aluna 1" },
      { id: 2, name: "Aluna 2" },
      { id: 3, name: "Aluna 3" }
    ]
  };

  handleAdd = name => {
    this.setState(state => ({
      students: state.students.concat({ id: uuid(), name: name })
    }));
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

  render() {
    return (
      <div className="container">
        <NewStudent onAdd={this.handleAdd} />
        <StudentList
          students={this.state.students}
          onMove={this.handleMove}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

class NewStudent extends React.Component {
  state = {
    name: ""
  };

  render() {
    const { onAdd } = this.props;
    const { name } = this.state;

    return (
      <div className="new-student">
        <input
          type="text"
          className="new-student__input"
          placeholder="Digite o nome do novo aluno..."
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onAdd(event.target.value);
              this.setState({ name: "" });
            }
          }}
        />
      </div>
    );
  }
}

class Student extends React.Component {
  state = {
    isEditing: false
  };

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    this.props.onEdit(this.props.student.id);
    this.setState({ isEditing: false });
  };

  render() {
    const { student, index, total, onEdit, onDelete, onMove } = this.props;
    const { isEditing } = this.state;

    return (
      <div key="student.id" className="student">
        {isEditing ? (
          <input
            type="text"
            className="student__input"
            defaultValue={student.name}
          />
        ) : (
          <span className="student__text">{student.name}</span>
        )}
        {isEditing && (
          <React.Fragment>
            <button
              className="student__button student__button--red"
              onClick={this.handleCancel}
            >
              <i className="material-icons">clear</i>
            </button>
            <button
              className="student__button student__button--green"
              onClick={this.handleSave}
            >
              <i className="material-icons">done</i>
            </button>
          </React.Fragment>
        )}
        <button
          className="student__button"
          disabled={isEditing}
          onClick={this.handleEdit}
        >
          <i className="material-icons">edit</i>
        </button>
        <button
          className="student__button"
          disabled={isEditing}
          onClick={() => {
            onDelete(student.id);
          }}
        >
          <i className="material-icons">delete</i>
        </button>
        <div
          className={classNames("student__arrows", {
            "student__arrows--hidden": total === 1
          })}
        >
          <button
            className={classNames("student__button", "student__button--arrow", {
              "student__button--hidden": index === 0
            })}
            onClick={() => {
              onMove("up", index);
            }}
          >
            <i className="material-icons">keyboard_arrow_up</i>
          </button>
          <button
            className={classNames("student__button", "student__button--arrow", {
              "student__button--hidden": index === total - 1
            })}
            onClick={() => {
              onMove("down", index);
            }}
          >
            <i className="material-icons">keyboard_arrow_down</i>
          </button>
        </div>
      </div>
    );
  }
}

const StudentList = ({ students, onEdit, onDelete, onMove }) => (
  <div className="student-list">
    {students.map((student, index) => (
      <Student
        student={student}
        index={index}
        total={students.length}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
      />
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
