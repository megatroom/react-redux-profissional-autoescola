import React from "react";
import { sortableContainer } from "react-sortable-hoc";
import AlunosItem from "./AlunosItem";

const AlunosList = sortableContainer(
	({ alunos, onEdit, onDelete, turma, onEditAlunoClasse }) => (
		<div className="list">
			{alunos.map(({ id, nome, idTurma }, i) => (
				<AlunosItem
					key={id}
					index={i}
					id={id}
					nome={nome}
					idTurma={idTurma}
					onEdit={onEdit}
					onDelete={onDelete}
					turma={turma}
					onEditAlunoClasse={onEditAlunoClasse}
				/>
			))}
		</div>
	)
);

export default AlunosList;
