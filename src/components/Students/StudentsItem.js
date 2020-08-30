import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";

import Item from "../Item/Item";
import ItemEditing from "../Item/ItemEditing";
import ItemButton from "../Item/ItemButton";

class StudentsItem extends Component {
	state = {
		isEditing: false,
	};

	handleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	handleSave = () => {
		this.props.onEditStudents({ id: this.props.id, name: this.input.value });
		this.handleEditing();
	};

	render() {
		const {
			id,
			name,
			idTurma,
			onDeleteStudents,
			onEditStudents,
			turma,
			onEditTheoreticalClasses,
		} = this.props;
		const { isEditing } = this.state;
		return (
			<Item id={id} title={!!turma ? turma.name : null}>
				{isEditing ? (
					<ItemEditing
						defaultValue={name}
						thisInput={(c) => {
							this.input = c;
						}}
						onKeyPress={(event) => {
							if (event.key === "Enter") this.handleSave();
						}}
						Editing={this.handleEditing}
						Save={this.handleSave}
					/>
				) : (
					<Fragment>
						<div className="item__text">
							<span>{name}</span>
							{!!turma && turma.id && idTurma && (
								<i className="material-icons">check</i>
							)}
						</div>
						{!turma && (
							<ItemButton title="Editar aluno" onClick={this.handleEditing}>
								edit
							</ItemButton>
						)}
					</Fragment>
				)}
				{!!turma && turma.id ? (
					<ItemButton
						title={(idTurma ? "Remover" : "Incluir") + " aluno"}
						onClick={() => {
							onEditTheoreticalClasses({
								id: turma.id,
								op: idTurma ? "-" : "+",
							});
							onEditStudents({
								id: id,
								op: idTurma ? "-" : "+",
								idTurma: turma.id,
							});
						}}
					>
						{idTurma ? "remove" : "add"}
					</ItemButton>
				) : (
					<ItemButton
						disabled={idTurma || this.state.isEditing}
						title={idTurma ? "Student registrado em turma" : "Excluir aluno"}
						onClick={() => {
							if (!idTurma) onDeleteStudents(id);
						}}
					>
						delete
					</ItemButton>
				)}
			</Item>
		);
	}
}

export default sortableElement(StudentsItem);
