import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ItemList from "../ItemList/ItemList";
import AlunosItem from "../AlunosItem/AlunosItem";

const AlunosList = sortableContainer(
	({ alunos, onEditAlunos, onDeleteAlunos, onEditClasses, turma }) => (
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
							onEditAlunos={onEditAlunos}
							onDeleteAlunos={onDeleteAlunos}
							turma={turma}
							onEditClasses={onEditClasses}
						/>
					);
			})}
		</ItemList>
	)
);

export default AlunosList;
