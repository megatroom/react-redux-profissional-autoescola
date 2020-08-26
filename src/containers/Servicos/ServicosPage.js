import React, { Component, Fragment } from "react";

import {
	ClassesNew,
	ClassesList,
	Error,
	Title,
	ButtonAdd,
} from "../../components";

import withServicos from "./withServicos";

class ServicosPage extends Component {
	constructor(props) {
		super(props);
		this.state = { add_turma: false };
	}

	handleAdd = () => {
		this.setState({ add_turma: !this.state.add_turma });
	};

	render() {
		const {
			classes,
			onAddClasses,
			onEditClasses,
			onDeleteClasses,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			onDefineClasse,
			saveHasError,
			handleSaveClasses,
		} = this.props;
		const { add_turma } = this.state;
		return (
			<div>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Aula Teórica"
					saveHasError={saveHasError}
					handleSave={handleSaveClasses}
				/>
				<ButtonAdd
					title="Adicionar nova turma"
					onClick={this.handleAdd}
					_add={add_turma}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<ClassesNew add_turma={add_turma} onAdd={onAddClasses} />
						<ClassesList
							onSortEnd={onSortEnd}
							classes={classes}
							onEditClasses={onEditClasses}
							onDeleteClasses={onDeleteClasses}
							onDefineClasse={onDefineClasse}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withServicos(ServicosPage);
