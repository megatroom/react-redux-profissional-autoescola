import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import PracticalClassesItem from "./PracticalClassesItem";
import ItemList from "../ItemList/ItemList";

const PracticalClassesList = sortableContainer(
	({
		practical_classes,
		onEditPracticalClasses,
		onDeletePracticalClasses,
		onDefinePracticalClass,
	}) => (
		<ItemList>
			{practical_classes.map(({ id, description, idTeacher }, i) => (
				<PracticalClassesItem
					key={id}
					index={i}
					id={id}
					description={description}
					idTeacher={idTeacher}
					onEditPracticalClasses={onEditPracticalClasses}
					onDeletePracticalClasses={onDeletePracticalClasses}
					onDefinePracticalClass={onDefinePracticalClass}
				/>
			))}
		</ItemList>
	)
);

export default PracticalClassesList;
