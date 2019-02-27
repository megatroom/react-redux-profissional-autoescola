import React, { Fragment } from "react";

import NewTurma from "../components/NewTurma";
import TurmasList from "../components/TurmasList";

import Error from "../components/Error";

class AulaTeorica extends React.Component {
  state = {
    inOnNewTurma: false
  };
  handleOpenNewTurma = () => {
    this.setState({ isOnNewTurma: true });
  };
  handleCloseNewTurma = () => {
    this.setState({ isOnNewTurma: false });
  };
  render() {
    const { isOnNewTurma } = this.state;
    const {
      turmas,
      onAddTurma,
      onDeleteTurma,
      onEditTurma,
      reloadHasError,
      onRetry
    } = this.props;
    return (
      <div className="aula-teorica">
        <h1>Aula Teórica</h1>
        <div className="line" />

        {!reloadHasError ? (
          <Fragment>
            {isOnNewTurma ? (
              <NewTurma
                onClose={this.handleCloseNewTurma}
                onAddTurma={onAddTurma}
              />
            ) : (
              <button
                className="aula-teorica__button"
                onClick={this.handleOpenNewTurma}
              >
                <i className="material-icons">add_circle_outline</i>
              </button>
            )}
            <TurmasList
              turmas={turmas}
              onEditTurma={onEditTurma}
              onDeleteTurma={onDeleteTurma}
            />
          </Fragment>
        ) : (
          <Error onRetry={onRetry} erro={{ text: "Erro ao carregar turmas" }} />
        )}
      </div>
    );
  }
}

export default AulaTeorica;
