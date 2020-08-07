import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

import ClassesNew from "../components/ClassesNew";
import ClassesList from "../components/ClassesList";
import Error from "../components/Error";

class Servicos extends Component {
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
			history,
			reloadHasError,
		} = this.props;
		const { add_turma } = this.state;
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
				<span className="brand">Aula Teórica</span>
				<button
					title="Adicionar nova turma"
					onClick={this.handleAdd}
					className={classnames("add_turma__buton material-icons", {
						"add_turma--transition": add_turma,
					})}
				>
					{add_turma ? "cancel" : "add_circle_outline"}
				</button>
				<hr />

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
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withRouter(Servicos);
