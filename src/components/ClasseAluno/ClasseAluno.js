import React from "react";
import { withRouter } from "react-router-dom";

import AlunosList from "../AlunosList/AlunosList";
import Title from "../Title/Title";

const ClasseAluno = ({ turma, alunos, onEditAlunoClasse, history }) => {
	if (!turma.id) history.push("/servicos");
	return (
		<div>
			<Title title="Voltar para turmas" to="/servicos" text={turma.nome} />
			<AlunosList
				alunos={alunos}
				turma={turma}
				onEditAlunoClasse={onEditAlunoClasse}
			/>
		</div>
	);
};

export default withRouter(ClasseAluno);
