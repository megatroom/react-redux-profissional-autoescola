import React, { Component, Fragment } from "react";

import {
	PracticalClassesNew,
	PracticalClassesList,
	Error,
	Title,
} from "../../components";

import withPracticalClasses from "./withPracticalClasses";

class PracticalClassesPage extends Component {
	state = { add_turma: false };

	handleAdd = () => {
		this.setState({ add_turma: !this.state.add_turma });
	};

	render() {
		const {
			practical_classes,
			onAddPracticalClasses,
			onEditPracticalClasses,
			onDeletePracticalClasses,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			onDefinePracticalClass,
			saveHasError,
			handleSavePracticalClasses,
		} = this.props;
		const { add_turma } = this.state;
		return (
			<Fragment>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Aulas Práticas"
					saveHasError={saveHasError}
					handleSave={handleSavePracticalClasses}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<PracticalClassesNew
							add_turma={add_turma}
							onAdd={onAddPracticalClasses}
							onClick={this.handleAdd}
						/>
						<PracticalClassesList
							onSortEnd={onSortEnd}
							practical_classes={practical_classes}
							onEditPracticalClasses={onEditPracticalClasses}
							onDeletePracticalClasses={onDeletePracticalClasses}
							onDefinePracticalClass={onDefinePracticalClass}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

export default withPracticalClasses(PracticalClassesPage);
