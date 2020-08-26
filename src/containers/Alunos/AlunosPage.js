import React, { Component, Fragment } from "react";

import {
	AlunosNew,
	AlunosList,
	Error,
	Title,
	ButtonAdd,
} from "../../components";

import withAlunos from "./withAlunos";

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
			saveHasError,
			handleSaveAlunos,
		} = this.props;
		const { add_aluno } = this.state;
		return (
			<div>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Alunos"
					saveHasError={saveHasError}
					handleSave={handleSaveAlunos}
				/>
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
							onEditAlunos={onEditAlunos}
							onDeleteAlunos={onDeleteAlunos}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withAlunos(AlunosPage);
