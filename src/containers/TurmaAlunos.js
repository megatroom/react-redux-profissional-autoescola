import React from "react";

const TurmaAlunos = ({
  match,
  turmas,
  alunos,
  onIncluirAluno,
  onExcluirAluno
}) => (
  <div className="turma-alunos">
    <h1>
      {turmas[turmas.findIndex(turma => turma.id === match.params.id)].text}
    </h1>
    <div className="line" />
    {alunos
      .filter(aluno => aluno.turma === "" || aluno.turma === match.params.id)
      .map(aluno => (
        <div className="turma-alunos__aluno" key={aluno.id}>
          <span className="turma-alunos__aluno__text">{aluno.text}</span>
          {aluno.turma && <i className="material-icons">done</i>}
          {!aluno.turma ? (
            <button
              className="turma-alunos__aluno__button"
              onClick={() => {
                onIncluirAluno(aluno.id, match.params.id);
              }}
            >
              Incluir Aluno
            </button>
          ) : (
            <button
              className="turma-alunos__aluno__button"
              onClick={() => {
                onExcluirAluno(aluno.id);
              }}
            >
              Excluir Aluno
            </button>
          )}
        </div>
      ))}
  </div>
);

export default TurmaAlunos;
