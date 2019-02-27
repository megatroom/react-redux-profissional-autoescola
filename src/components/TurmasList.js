import React from "react";

import Turma from "./Turma";

const TurmasList = ({ turmas, onDeleteTurma, onEditTurma }) => (
  <div className="turmas-list">
    {turmas.map(turma => (
      <Turma
        key={turma.id}
        turma={turma}
        onDeleteTurma={onDeleteTurma}
        onEditTurma={onEditTurma}
      />
    ))}
  </div>
);

export default TurmasList;
