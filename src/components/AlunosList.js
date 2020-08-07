import React from "react";
import { sortableContainer } from "react-sortable-hoc";
import AlunosItem from "./AlunosItem";

const AlunosList = sortableContainer(({ alunos, onEdit, onDelete }) => (
	<div className="list">
		{alunos.map(({ id, nome }, i) => (
			<AlunosItem
				key={id}
				index={i}
				id={id}
				nome={nome}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		))}
	</div>
));

export default AlunosList;
