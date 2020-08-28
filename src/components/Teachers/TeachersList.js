import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ItemList from "../ItemList/ItemList";
import TeachersItem from "./TeachersItem";

const TeachersList = sortableContainer(
	({ teachers, onEditTeachers, onDeleteTeachers, onEditCars, carro }) => (
		<ItemList>
			{teachers.map(({ id, nome, idCarro }, i) => {
				if (!carro || (carro && idCarro === carro.id) || !idCarro)
					return (
						<TeachersItem
							key={id}
							index={i}
							id={id}
							nome={nome}
							idCarro={idCarro}
							onEditTeachers={onEditTeachers}
							onDeleteTeachers={onDeleteTeachers}
							carro={carro}
							onEditCars={onEditCars}
						/>
					);
			})}
		</ItemList>
	)
);

export default TeachersList;
