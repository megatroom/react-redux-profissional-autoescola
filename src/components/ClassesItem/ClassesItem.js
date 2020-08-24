import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";
import { withRouter } from "react-router-dom";

import Item from "../Item/Item";
import ItemEditing from "../Item/ItemEditing";
import ItemButton from "../Item/ItemButton";

class ClassesItem extends Component {
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
		this.props.onEdit(this.props.id, this.input.value);
		this.handleEditing();
	};

	render() {
		const { id, nome, qtd, onDelete, onDefineClasse, history } = this.props;
		const { isEditing } = this.state;
		return (
			<Item id={id}>
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
							<span>
								{nome}
								<br />
								<span className="item__text__qtd">
									{qtd ? qtd + " aluno" + (qtd > 1 ? "s" : "") : "nenhum aluno"}
								</span>
							</span>
						</div>
						<ItemButton
							title="Editar Alunos"
							onClick={() => {
								onDefineClasse(id, nome);
								history.push("/turma");
							}}
						>
							people
						</ItemButton>
						<ItemButton title="Editar turma" onClick={this.handleEditing}>
							edit
						</ItemButton>
					</Fragment>
				)}
				<ItemButton
					disabled={qtd || this.state.isEditing}
					title={qtd ? "Turma com alunos registrados" : "Excluir turma"}
					onClick={() => {
						if (!qtd) onDelete(id);
					}}
				>
					delete
				</ItemButton>
			</Item>
		);
	}
}

export default sortableElement(withRouter(ClassesItem));
