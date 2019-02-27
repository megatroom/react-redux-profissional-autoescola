import React, { Fragment } from "react";

import NewAluno from "../components/NewAluno";
import AlunosList from "../components/AlunosList";
import Error from "../components/Error";

const Alunos = ({
  alunos,
  onAddAluno,
  onDeleteAluno,
  onEditAluno,
  reloadHasError,
  onRetry
}) => {
  return (
    <div className="alunos-container">
      <h1>Alunos</h1>
      <div className="line" />
      {!reloadHasError ? (
        <Fragment>
          <NewAluno onAddAluno={onAddAluno} />
          <AlunosList
            alunos={alunos}
            onDeleteAluno={onDeleteAluno}
            onEditAluno={onEditAluno}
          />
        </Fragment>
      ) : (
        <Error onRetry={onRetry} erro={{ text: "Erro ao carregar alunos" }} />
      )}
    </div>
  );
};

export default Alunos;
