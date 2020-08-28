import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";

import Item from "../Item/Item";
import ItemEditing from "../Item/ItemEditing";
import ItemButton from "../Item/ItemButton";

class TeachersItem extends Component {
	state = {
		isEditing: false,
	};

	handleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	handleSave = () => {
		this.props.onEditTeachers({ id: this.props.id, nome: this.input.value });
		this.handleEditing();
	};

	render() {
		const {
			id,
			nome,
			idCarro,
			onDeleteTeachers,
			onEditTeachers,
			carro,
			onEditCars,
		} = this.props;
		const { isEditing } = this.state;
		return (
			<Item id={id} title={!!carro ? carro.descricao : null}>
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
							{!!carro && carro.id && idCarro && (
								<i className="material-icons">check</i>
							)}
						</div>
						{!carro && (
							<ItemButton title="Editar professor" onClick={this.handleEditing}>
								edit
							</ItemButton>
						)}
					</Fragment>
				)}
				{!!carro && carro.id ? (
					<ItemButton
						title={(idCarro ? "Remover" : "Incluir") + " professor"}
						onClick={() => {
							onEditCars({
								id: carro.id,
								att: idCarro ? 0 : 1,
								idTeacher: id,
							});
							onEditTeachers({
								id: id,
								att: idCarro ? 0 : 1,
								idCarro: carro.id,
							});
						}}
					>
						{idCarro ? "remove" : "add"}
					</ItemButton>
				) : (
					<ItemButton
						disabled={idCarro || this.state.isEditing}
						title={
							idCarro ? "Teacher registrado em carro" : "Excluir professor"
						}
						onClick={() => {
							if (!idCarro) onDeleteTeachers(id);
						}}
					>
						delete
					</ItemButton>
				)}
			</Item>
		);
	}
}

export default sortableElement(TeachersItem);
