import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

class App extends React.Component {
  state = {
    students: []
  };

  handleAddStudent = name => {
    this.setState(state => ({
      students: state.students.concat(name)
    }));
  };

  render() {
    return (
      <div className="container">
        <NewStudent onAddStudent={this.handleAddStudent} />
        <StudentList students={this.state.students} />
      </div>
    );
  }
}

class NewStudent extends React.Component {
  state = {
    name: ""
  };

  render() {
    const { onAddStudent } = this.props;
    const { name } = this.state;

    return (
      <div className="new-student">
        <input
          type="text"
          className="new-student__input"
          placeholder="Digite o nome do novo aluno..."
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onAddStudent(event.target.value);
              this.setState({ name: "" });
            }
          }}
        />
      </div>
    );
  }
}

const StudentList = ({ students }) => (
  <div className="student-list">
    {students.map(student => (
      <div className="student">{student}</div>
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
