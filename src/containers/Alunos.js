import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import AlunoNew from "../components/AlunosNew";
import AlunosList from "../components/AlunosList";
import Error from "../components/Error";

class Alunos extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			alunos,
			onAddAlunos,
			onEditAlunos,
			onDeleteAlunos,
			onSortEnd,
			onRetryReload,
			history,
			reloadHasError,
			getTurma,
		} = this.props;
		return (
			<div>
				<button
					title="Voltar para tela principal"
					className="back material-icons"
					onClick={() => {
						history.push("/");
					}}
				>
					chevron_left
				</button>
				<span className="brand">Alunos</span>
				<hr />
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<AlunoNew onAdd={onAddAlunos} />
						<AlunosList
							onSortEnd={onSortEnd}
							alunos={alunos}
							onEdit={onEditAlunos}
							onDelete={onDeleteAlunos}
							getTurma={getTurma}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withRouter(Alunos);
