import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";
import { withRouter } from "react-router-dom";

import Item from "../Item/Item";
import ItemEditing from "../Item/ItemEditing";
import ItemButton from "../Item/ItemButton";

class PracticalClassesItem extends Component {
	state = {
		isEditing: false,
	};

	handleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	handleSave = () => {
		this.props.onEditPracticalClasses({
			id: this.props.id,
			description: this.input.value,
		});
		this.handleEditing();
	};

	render() {
		const {
			id,
			description,
			idTeacher,
			onDeletePracticalClasses,
			onDefinePracticalClass,
			history,
		} = this.props;
		const { isEditing } = this.state;
		return (
			<Item id={id}>
				{isEditing ? (
					<ItemEditing
						defaultValue={description}
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
							<span>
								{description}
								<br />
								<span className="item__text__qtd">
									{idTeacher ? "Atribuído a professor" : "Não atribuído"}
								</span>
							</span>
						</div>
						<ItemButton
							title="Alunos"
							onClick={() => {
								onDefinePracticalClass(id, description);
								history.push("/practical_schedule");
							}}
						>
							groups
						</ItemButton>
						<ItemButton title="Editar turma" onClick={this.handleEditing}>
							edit
						</ItemButton>
					</Fragment>
				)}
				<ItemButton
					disabled={idTeacher || this.state.isEditing}
					title={
						idTeacher
							? "PracticalClassro com professor registrado"
							: "Excluir turma"
					}
					onClick={() => {
						if (!idTeacher) onDeletePracticalClasses(id);
					}}
				>
					delete
				</ItemButton>
			</Item>
		);
	}
}

export default sortableElement(withRouter(PracticalClassesItem));
