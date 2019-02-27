import React from "react";

import Aluno from "./Aluno";

const AlunosList = ({ alunos, onDeleteAluno, onEditAluno }) => (
  <div className="alunos-list">
    {alunos.map(aluno => (
      <Aluno
        key={aluno.id}
        aluno={aluno}
        onDeleteAluno={onDeleteAluno}
        onEditAluno={onEditAluno}
      />
    ))}
  </div>
);

export default AlunosList;
