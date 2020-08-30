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
		this.props.onEditTeachers({ id: this.props.id, name: this.input.value });
		this.handleEditing();
	};

	render() {
		const {
			id,
			name,
			cars,
			onDeleteTeachers,
			onEditTeachers,
			carro,
			idTeacher,
			onEditCars,
		} = this.props;
		const { isEditing } = this.state;
		const confirmed = cars.findIndex((c) => c.idCarro === carro.id) >= 0;
		const teacherGotCar = idTeacher && !(idTeacher === id) && !confirmed;
		return (
			<Item id={id} title={!!carro ? carro.description : null}>
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
							{!!carro && carro.id && confirmed && (
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
						disabled={teacherGotCar}
						title={
							(confirmed
								? "Desatribuir"
								: teacherGotCar
								? "Carro já atribuído a outro"
								: "Atribuir") + " professor"
						}
						onClick={() => {
							onEditCars({
								id: carro.id,
								att: !confirmed,
								idTeacher: id,
							});
							onEditTeachers({
								id: id,
								att: !confirmed,
								idCarro: carro.id,
							});
						}}
					>
						{confirmed ? "remove" : teacherGotCar ? "block" : "add"}
					</ItemButton>
				) : (
					<ItemButton
						disabled={confirmed || this.state.isEditing}
						title={
							confirmed ? "Professor com carro atribuído" : "Excluir professor"
						}
						onClick={() => {
							if (!confirmed) onDeleteTeachers(id);
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
