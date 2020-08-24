import React, { Component, Fragment } from "react";

import {
	ClassesNew,
	ClassesList,
	Error,
	Title,
	ButtonAdd,
} from "../../components";

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
		} = this.props;
		const { add_turma } = this.state;
		return (
			<div>
				<Title title="Voltar para tela principal" to="/" text="Aula Teórica" />
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
							// onSortEnd={onSortEnd}
							classes={classes}
							onEdit={onEditClasses}
							onDelete={onDeleteClasses}
							onDefineClasse={onDefineClasse}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default ServicosPage;
