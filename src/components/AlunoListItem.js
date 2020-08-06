import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			// isEditing: true,
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
			<div key={id} className="alunos__list__aluno">
				{isEditing ? (
					<Fragment>
						<input
							type="text"
							className="alunos__list__aluno__input"
							defaultValue={nome}
							ref={(c) => {
								this.input = c;
							}}
							onKeyPress={(event) => {
								if (event.key === "Enter") this.handleSave();
							}}
						/>
						<button
							onClick={this.handleEditing}
							className="alunos__list__aluno__action alunos__list__aluno__action--red material-icons"
						>
							cancel
						</button>
						<button
							onClick={this.handleSave}
							className="alunos__list__aluno__action alunos__list__aluno__action--green material-icons"
						>
							save
						</button>
					</Fragment>
				) : (
					<Fragment>
						<div className="alunos__list__aluno__text">
							<span>{nome}</span>
						</div>
						<button
							onClick={this.handleEditing}
							className="alunos__list__aluno__action material-icons"
						>
							edit
						</button>
					</Fragment>
				)}
				<button
					disabled={this.state.isEditing}
					onClick={() => {
						onDelete(id);
					}}
					className="alunos__list__aluno__action material-icons"
				>
					delete
				</button>
			</div>
		);
	}
}

export default sortableElement(ListItem);
