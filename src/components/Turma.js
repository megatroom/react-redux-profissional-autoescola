import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

class Turma extends React.Component {
  state = {
    isEditing: false
  };
  handleEdit = () => {
    this.setState({ isEditing: true });
  };
  handleCancelEdit = () => {
    this.setState({ isEditing: false });
  };
  handleSaveTurma = () => {
    this.props.onEditTurma(this.props.turma.id, this.input.value);
    this.setState({ isEditing: false });
  };
  render() {
    const { turma, onDeleteTurma, history } = this.props;
    const { isEditing } = this.state;
    return (
      <div className="turma">
        <div className="turma__box">
          {!isEditing ? (
            <span className="turma__text">{turma.text}</span>
          ) : (
            <input
              className="turma__input"
              defaultValue={turma.text}
              ref={c => {
                this.input = c;
              }}
            />
          )}
          {turma.alunos.length > 0 ? (
            <span className="turma__text">{turma.alunos.length} alunos</span>
          ) : (
            <span className="turma__text">nenhum aluno</span>
          )}
        </div>
        {!isEditing ? (
          <Fragment>
            <button
              className="turma__button"
              onClick={() => {
                history.push(`/turma/${turma.id}`);
              }}
            >
              Alunos
            </button>
            <button className="turma__button" onClick={this.handleEdit}>
              Editar
            </button>
            <button
              className="turma__button"
              onClick={() => {
                onDeleteTurma(turma.id);
              }}
            >
              Excluir
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button className="turma__button" onClick={this.handleSaveTurma}>
              <i className="material-icons">save</i>
            </button>
            <button className="turma__button" onClick={this.handleCancelEdit}>
              <i className="material-icons">cancel</i>
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(Turma);
