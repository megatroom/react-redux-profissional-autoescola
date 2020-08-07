import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import ClassesNew from "../components/ClassesNew";
import ClassesList from "../components/ClassesList";
import Error from "../components/Error";

class Servicos extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

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
				<hr />

				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<ClassesNew onAdd={onAddClasses} />
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
