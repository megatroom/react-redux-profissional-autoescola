import React, { Fragment } from "react";

class Aluno extends React.Component {
  state = {
    isEditing: false
  };
  handleEdit = () => {
    this.setState({ isEditing: true });
  };
  handleCancelEdit = () => {
    this.setState({ isEditing: false });
  };
  handleSaveAluno = () => {
    this.props.onEditAluno(this.props.aluno.id, this.input.value);
    this.setState({ isEditing: false });
  };
  render() {
    const { aluno, onDeleteAluno } = this.props;
    const { isEditing } = this.state;
    return (
      <div className="aluno">
        {!isEditing ? (
          <Fragment>
            <span className="aluno__text">{aluno.text}</span>
            <button className="aluno__button" onClick={this.handleEdit}>
              <i className="material-icons">edit</i>
            </button>
            <button
              className="aluno__button"
              onClick={() => {
                onDeleteAluno(aluno.id);
              }}
            >
              <i className="material-icons">delete</i>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <input
              type="text"
              className="aluno__input"
              defaultValue={aluno.text}
              ref={c => {
                this.input = c;
              }}
            />
            <button className="aluno__button" onClick={this.handleSaveAluno}>
              <i className="material-icons">save</i>
            </button>
            <button className="aluno__button" onClick={this.handleCancelEdit}>
              <i className="material-icons">cancel</i>
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Aluno;
