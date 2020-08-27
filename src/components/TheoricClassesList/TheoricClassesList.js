import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import TheoricClassesItem from "../TheoricClassesItem/TheoricClassesItem";
import ItemList from "../ItemList/ItemList";

const TheoricClassesList = sortableContainer(
	({
		theoric_classes,
		onEditTheoricClasses,
		onDeleteTheoricClasses,
		onDefineTheoricClass,
	}) => (
		<ItemList>
			{theoric_classes.map(({ id, nome, qtd }, i) => (
				<TheoricClassesItem
					key={id}
					index={i}
					id={id}
					nome={nome}
					qtd={qtd}
					onEditTheoricClasses={onEditTheoricClasses}
					onDeleteTheoricClasses={onDeleteTheoricClasses}
					onDefineTheoricClass={onDefineTheoricClass}
				/>
			))}
		</ItemList>
	)
);

export default TheoricClassesList;
