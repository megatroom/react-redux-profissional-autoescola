import React from "react";

export default class NewStudent extends React.Component {
  state = {
    name: "",
    isAdding: false
  };

  handleAdd(student) {
    this.props.onAdd(student);
    this.setState({ name: "" });
  }

  render() {
    const { name } = this.state;

    return (
      <div className="new-student">
        <button className="new-student__button new-student__button--floating">
          <i className="material-icons">add</i>
        </button>
        <div className="new-student__container">
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
              this.handleAdd(
                document.querySelector(".new-student__input").value
              )
            }
          >
            <i className="material-icons">save</i>
          </button>
        </div>
      </div>
    );
  }
}
