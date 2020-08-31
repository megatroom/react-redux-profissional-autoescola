import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ItemList from "../ItemList/ItemList";
import PracticalScheduleItem from "./PracticalScheduleItem";

const PracticalScheduleList = sortableContainer(
	({ students, onEditStudents, turma }) => (
		<ItemList>
			{students.map(({ id, name, idTurma, qtdPractical }, i) => {
				if (!idTurma)
					return (
						<PracticalScheduleItem
							key={id}
							index={i}
							id={id}
							name={name}
							qtdPractical={qtdPractical}
							onEditStudents={onEditStudents}
							turma={turma}
						/>
					);
			})}
		</ItemList>
	)
);

export default PracticalScheduleList;
