import React, { Component, Fragment } from "react";

import {
	TheoreticalClassesNew,
	TheoreticalClassesList,
	Error,
	Title,
} from "../../components";

import withTheoreticalClasses from "./withTheoreticalClasses";

class TheoreticalClassesPage extends Component {
	state = { add_turma: false };

	handleAdd = () => {
		this.setState({ add_turma: !this.state.add_turma });
	};

	render() {
		const {
			theoretical_classes,
			onAddTheoreticalClasses,
			onEditTheoreticalClasses,
			onDeleteTheoreticalClasses,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			onDefineTheoreticalClass,
			saveHasError,
			handleSaveTheoreticalClasses,
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
					handleSave={handleSaveTheoreticalClasses}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<TheoreticalClassesNew
							add_turma={add_turma}
							onAdd={onAddTheoreticalClasses}
							onClick={this.handleAdd}
						/>
						<TheoreticalClassesList
							onSortEnd={onSortEnd}
							theoretical_classes={theoretical_classes}
							onEditTheoreticalClasses={onEditTheoreticalClasses}
							onDeleteTheoreticalClasses={onDeleteTheoreticalClasses}
							onDefineTheoreticalClass={onDefineTheoreticalClass}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

export default withTheoreticalClasses(TheoreticalClassesPage);
