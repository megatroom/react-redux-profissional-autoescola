import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ItemList from "../ItemList/ItemList";
import AlunosItem from "../AlunosItem/AlunosItem";

const AlunosList = sortableContainer(
	({ alunos, onEdit, onDelete, turma, onEditAlunoClasse, getTurma }) => (
		<ItemList>
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
		</ItemList>
	)
);

export default AlunosList;
