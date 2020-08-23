import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import AlunosItem from "../AlunosItem/AlunosItem";

import "../../styles/list.scss";

const AlunosList = sortableContainer(
	({ alunos, onEdit, onDelete, turma, onEditAlunoClasse, getTurma }) => (
		<div className="list">
			{alunos.map(({ id, nome, idTurma }, i) => {
				if (!turma || (turma && idTurma === turma.id) || !idTurma)
					return (
						<AlunosItem
							key={id}
							index={i}
							id={id}
							nome={nome}
							idTurma={idTurma}
							onEdit={onEdit}
							onDelete={onDelete}
							turma={turma}
							getTurma={getTurma}
							onEditAlunoClasse={onEditAlunoClasse}
						/>
					);
			})}
		</div>
	)
);

export default AlunosList;
