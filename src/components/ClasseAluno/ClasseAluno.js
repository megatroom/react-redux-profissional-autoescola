import React from "react";
import { withRouter } from "react-router-dom";

import AlunosList from "../AlunosList/AlunosList";
import Title from "../Title/Title";

import withAlunos from "../../containers/Alunos/withAlunos";
import withServicos from "../../containers/Servicos/withServicos";

const ClasseAluno = ({
	turma,
	alunos,
	onEditClasses,
	onEditAlunos,
	history,
}) => {
	if (!turma.id) history.push("/servicos");
	return (
		<div>
			<Title title="Voltar para turmas" to="/servicos" text={turma.nome} />
			<AlunosList
				alunos={alunos}
				onEditAlunos={onEditAlunos}
				onEditClasses={onEditClasses}
				turma={turma}
			/>
		</div>
	);
};

export default withRouter(withServicos(withAlunos(ClasseAluno)));
