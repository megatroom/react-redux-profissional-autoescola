import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import ClassesItem from "../ClassesItem/ClassesItem";
import ItemList from "../ItemList/ItemList";

const ClassesList = sortableContainer(
	({ classes, onEditClasses, onDeleteClasses, onDefineClasse }) => (
		<ItemList>
			{classes.map(({ id, nome, qtd }, i) => (
				<ClassesItem
					key={id}
					index={i}
					id={id}
					nome={nome}
					qtd={qtd}
					onEditClasses={onEditClasses}
					onDeleteClasses={onDeleteClasses}
					onDefineClasse={onDefineClasse}
				/>
			))}
		</ItemList>
	)
);

export default ClassesList;
