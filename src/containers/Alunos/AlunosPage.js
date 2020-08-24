import React, { Component, Fragment } from "react";

import {
	AlunosNew,
	AlunosList,
	Error,
	Title,
	ButtonAdd,
} from "../../components";

class AlunosPage extends Component {
	constructor(props) {
		super(props);
		this.state = { add_aluno: false };
	}

	handleAdd = () => {
		this.setState({ add_aluno: !this.state.add_aluno });
	};

	render() {
		const {
			alunos,
			onAddAlunos,
			onEditAlunos,
			onDeleteAlunos,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			getTurma,
		} = this.props;
		const { add_aluno } = this.state;
		return (
			<div>
				<Title title="Voltar para tela principal" to="/" text="Alunos" />
				<ButtonAdd
					title="Adicionar novo aluno"
					onClick={this.handleAdd}
					_add={add_aluno}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<AlunosNew add_aluno={add_aluno} onAdd={onAddAlunos} />
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

export default AlunosPage;
