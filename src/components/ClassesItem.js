import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";

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
		const { id, nome, onDelete } = this.props;
		const { isEditing } = this.state;
		return (
			<div key={id} className="list__item">
				{isEditing ? (
					<Fragment>
						<input
							type="text"
							className="list__item__input"
							defaultValue={nome}
							ref={(c) => {
								this.input = c;
								// this.input.select();
							}}
							onKeyPress={(event) => {
								if (event.key === "Enter") this.handleSave();
							}}
						/>
						<button
							title="Cancelar edição"
							onClick={this.handleEditing}
							className="list__item__action list__item__action--red material-icons"
						>
							cancel
						</button>
						<button
							title="Salvar edição"
							onClick={this.handleSave}
							className="list__item__action list__item__action--green material-icons"
						>
							save
						</button>
					</Fragment>
				) : (
					<Fragment>
						<div className="list__item__text">
							<span>{nome}</span>
						</div>
						<button
							title="Editar turma"
							onClick={this.handleEditing}
							className="list__item__action material-icons"
						>
							edit
						</button>
					</Fragment>
				)}
				<button
					disabled={this.state.isEditing}
					title="Excluir turma"
					onClick={() => {
						onDelete(id);
					}}
					className="list__item__action material-icons"
				>
					delete
				</button>
			</div>
		);
	}
}

export default sortableElement(ClassesItem);
