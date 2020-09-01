import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import TheoreticalClassesItem from "./TheoreticalClassesItem";
import ItemList from "../ItemList/ItemList";

const TheoreticalClassesList = sortableContainer(
	({
		theoretical_classes,
		onEditTheoreticalClasses,
		onDeleteTheoreticalClasses,
		onDefineTheoreticalClass,
	}) => (
		<ItemList>
			{theoretical_classes.map(({ id, name, qtd }, i) => (
				<TheoreticalClassesItem
					key={id}
					index={i}
					id={id}
					name={name}
					qtd={qtd}
					onEditTheoreticalClasses={onEditTheoreticalClasses}
					onDeleteTheoreticalClasses={onDeleteTheoreticalClasses}
					onDefineTheoreticalClass={onDefineTheoreticalClass}
				/>
			))}
		</ItemList>
	)
);

export default TheoreticalClassesList;
