import React from "react";

class NewAluno extends React.Component {
  state = {
    text: ""
  };
  render() {
    const { text } = this.state;
    const { onAddAluno } = this.props;
    return (
      <div className="new-aluno">
        <input
          type="text"
          className="new-aluno__input"
          placeholder="Digite o nome do aluno."
          value={text}
          onChange={event => {
            this.setState({ text: event.target.value });
          }}
        />
        <button
          className="new-aluno__button"
          onClick={() => {
            onAddAluno(text);
            this.setState({
              text: ""
            });
          }}
        >
          Incluir Aluno
        </button>
      </div>
    );
  }
}

export default NewAluno;
