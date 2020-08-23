import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import { AlunosNew, AlunosList, Error } from "../../components";

// import "../../styles/brand.scss";

class AlunosPage extends Component {
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
				<div className="brand">
					<button
						title="Voltar para tela principal"
						className="brand__back material-icons"
						onClick={() => {
							history.push("/");
						}}
					>
						chevron_left
					</button>
					<span>Alunos</span>
					<hr />
				</div>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<AlunosNew onAdd={onAddAlunos} />
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

export default withRouter(AlunosPage);
