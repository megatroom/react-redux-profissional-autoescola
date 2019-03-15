import React from "react";

export default class NewStudent extends React.Component {
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
