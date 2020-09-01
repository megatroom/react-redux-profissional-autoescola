import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ItemList from "../ItemList/ItemList";
import TeachersItem from "./TeachersItem";

const TeachersList = sortableContainer(
	({
		teachers,
		onEditTeachers,
		onDeleteTeachers,
		onEditCars,
		carro,
		idTeacher,
	}) => (
		<ItemList>
			{teachers.map(({ id, name, cars }, i) => {
				return (
					<TeachersItem
						key={id}
						index={i}
						id={id}
						name={name}
						cars={cars}
						onEditTeachers={onEditTeachers}
						onDeleteTeachers={onDeleteTeachers}
						carro={carro}
						idTeacher={idTeacher}
						onEditCars={onEditCars}
					/>
				);
			})}
		</ItemList>
	)
);

export default TeachersList;
