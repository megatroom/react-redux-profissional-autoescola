import React from "react";

class NewTurma extends React.Component {
  state = {
    text: ""
  };
  render() {
    const { text } = this.state;
    const { onClose, onAddTurma } = this.props;
    return (
      <div className="new-turma">
        <input
          type="text"
          className="new-turma__input"
          autoFocus={true}
          value={text}
          onChange={event => {
            this.setState({ text: event.target.value });
          }}
        />
        <button
          className="new-turma__button"
          onClick={() => {
            onAddTurma(text);
            this.setState({ text: "" });
            onClose();
          }}
        >
          <i className="material-icons">save</i>
        </button>
        <button className="new-turma__button">
          <i className="material-icons" onClick={onClose}>
            cancel
          </i>
        </button>
      </div>
    );
  }
}

export default NewTurma;
