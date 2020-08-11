import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";
import { withRouter } from "react-router-dom";

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
							<span>
								{nome}
								<br />
								<span className="list__item__text__qtd">
									{qtd ? qtd + " aluno" + (qtd > 1 ? "s" : "") : "nenhum aluno"}
								</span>
							</span>
						</div>
						<button
							title="Editar Alunos"
							onClick={() => {
								onDefineClasse(id, nome);
								history.push("/turma");
							}}
							className="list__item__action material-icons"
						>
							people
						</button>
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
					disabled={qtd || this.state.isEditing}
					title={qtd ? "Turma com alunos registrados" : "Excluir turma"}
					onClick={() => {
						if (!qtd) onDelete(id);
					}}
					className="list__item__action material-icons"
				>
					delete
				</button>
			</div>
		);
	}
}

export default sortableElement(withRouter(ClassesItem));
