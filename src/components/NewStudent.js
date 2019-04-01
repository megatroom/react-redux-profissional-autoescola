import React from "react";

export default class NewStudent extends React.Component {
  state = {
    name: ""
  };

  handleAdd(student) {
    this.props.onAdd(student);
    this.setState({ name: "" });
  }

  render() {
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
            if (event.key === "Enter") this.handleAdd(event.target.value);
          }}
        />
        <button
          className="new-student__button"
          onClick={() =>
            this.handleAdd(document.querySelector(".new-student__input").value)
          }
        >
          <i className="material-icons">save</i>
        </button>
      </div>
    );
  }
}
