import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";

import Item from "../Item/Item";
import ItemEditing from "../Item/ItemEditing";
import ItemButton from "../Item/ItemButton";

class AlunosItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
		};
	}

	handleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	handleSave = () => {
		this.props.onEditAlunos({ id: this.props.id, nome: this.input.value });
		this.handleEditing();
	};

	render() {
		const {
			id,
			nome,
			idTurma,
			onDeleteAlunos,
			onEditAlunos,
			turma,
			onEditClasses,
		} = this.props;
		const { isEditing } = this.state;
		return (
			<Item id={id} title={!!turma ? turma.nome : null}>
				{isEditing ? (
					<ItemEditing
						defaultValue={nome}
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
							<span>{nome}</span>
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
							onEditClasses({ id: turma.id, op: idTurma ? "-" : "+" });
							onEditAlunos({
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
						title={idTurma ? "Aluno registrado em turma" : "Excluir aluno"}
						onClick={() => {
							if (!idTurma) onDeleteAlunos(id);
						}}
					>
						delete
					</ItemButton>
				)}
			</Item>
		);
	}
}

export default sortableElement(AlunosItem);
