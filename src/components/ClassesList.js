import React from "react";
import { sortableContainer } from "react-sortable-hoc";
import ClassesItem from "./ClassesItem";

const ClassesList = sortableContainer(
	({ classes, onEdit, onDelete, onDefineClasse }) => (
		<div className="list">
			{classes.map(({ id, nome, qtd }, i) => (
				<ClassesItem
					key={id}
					index={i}
					id={id}
					nome={nome}
					qtd={qtd}
					onEdit={onEdit}
					onDelete={onDelete}
					onDefineClasse={onDefineClasse}
				/>
			))}
		</div>
	)
);

export default ClassesList;
