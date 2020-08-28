import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ItemList from "../ItemList/ItemList";
import StudentsItem from "./StudentsItem";

const StudentsList = sortableContainer(
	({
		students,
		onEditStudents,
		onDeleteStudents,
		onEditTheoreticalClasses,
		turma,
	}) => (
		<ItemList>
			{students.map(({ id, nome, idTurma }, i) => {
				if (!turma || (turma && idTurma === turma.id) || !idTurma)
					return (
						<StudentsItem
							key={id}
							index={i}
							id={id}
							nome={nome}
							idTurma={idTurma}
							onEditStudents={onEditStudents}
							onDeleteStudents={onDeleteStudents}
							turma={turma}
							onEditTheoreticalClasses={onEditTheoreticalClasses}
						/>
					);
			})}
		</ItemList>
	)
);

export default StudentsList;
