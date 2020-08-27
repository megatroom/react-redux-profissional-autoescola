import React, { Component, Fragment } from "react";

import {
	TheoricClassesNew,
	TheoricClassesList,
	Error,
	Title,
} from "../../components";

import withTheoricClasses from "./withTheoricClasses";

class TheoricClassesPage extends Component {
	constructor(props) {
		super(props);
		this.state = { add_turma: false };
	}

	handleAdd = () => {
		this.setState({ add_turma: !this.state.add_turma });
	};

	render() {
		const {
			theoric_classes,
			onAddTheoricClasses,
			onEditTheoricClasses,
			onDeleteTheoricClasses,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			onDefineTheoricClass,
			saveHasError,
			handleSaveTheoricClasses,
		} = this.props;
		const { add_turma } = this.state;
		return (
			<Fragment>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Aula Teórica"
					saveHasError={saveHasError}
					handleSave={handleSaveTheoricClasses}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<TheoricClassesNew
							add_turma={add_turma}
							onAdd={onAddTheoricClasses}
							onClick={this.handleAdd}
						/>
						<TheoricClassesList
							onSortEnd={onSortEnd}
							theoric_classes={theoric_classes}
							onEditTheoricClasses={onEditTheoricClasses}
							onDeleteTheoricClasses={onDeleteTheoricClasses}
							onDefineTheoricClass={onDefineTheoricClass}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

export default withTheoricClasses(TheoricClassesPage);
