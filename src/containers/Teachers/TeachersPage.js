import React, { Component, Fragment } from "react";

import { TeachersNew, TeachersList, Error, Title } from "../../components";

import withTeachers from "./withTeachers";

class TeachersPage extends Component {
	state = { add_teacher: false };

	handleAdd = () => {
		this.setState({ add_teacher: !this.state.add_teacher });
	};

	render() {
		const {
			teachers,
			onAddTeachers,
			onEditTeachers,
			onDeleteTeachers,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			saveHasError,
			handleSaveTeachers,
		} = this.props;
		const { add_teacher } = this.state;
		return (
			<div>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Professores"
					saveHasError={saveHasError}
					handleSave={handleSaveTeachers}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<TeachersNew
							add_teacher={add_teacher}
							onAdd={onAddTeachers}
							onClick={this.handleAdd}
						/>
						<TeachersList
							onSortEnd={onSortEnd}
							teachers={teachers}
							onEditTeachers={onEditTeachers}
							onDeleteTeachers={onDeleteTeachers}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withTeachers(TeachersPage);
