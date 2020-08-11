import React from "react";
import { withRouter } from "react-router-dom";

import AlunosList from "./AlunosList";

const ClasseAluno = ({ turma, alunos, onEditAlunoClasse, history }) => {
	if (!turma.id) history.push("/servicos");
	return (
		<div>
			<button
				title="Voltar para tela principal"
				className="back material-icons"
				onClick={() => {
					history.push("/servicos");
				}}
			>
				chevron_left
			</button>
			<span className="brand">{turma.nome}</span>
			<hr />
			<AlunosList
				alunos={alunos}
				turma={turma}
				onEditAlunoClasse={onEditAlunoClasse}
			/>
		</div>
	);
};

export default withRouter(ClasseAluno);
