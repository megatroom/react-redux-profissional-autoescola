import React, { Component, Fragment } from "react";

import {
	StudentsNew,
	StudentsList,
	Error,
	Title,
	ButtonAdd,
} from "../../components";

import withStudents from "./withStudents";

class StudentsPage extends Component {
	constructor(props) {
		super(props);
		this.state = { add_student: false };
	}

	handleAdd = () => {
		this.setState({ add_student: !this.state.add_student });
	};

	render() {
		const {
			students,
			onAddStudents,
			onEditStudents,
			onDeleteStudents,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			saveHasError,
			handleSaveStudents,
		} = this.props;
		const { add_student } = this.state;
		return (
			<div>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Alunos"
					saveHasError={saveHasError}
					handleSave={handleSaveStudents}
				/>
				<ButtonAdd
					title="Adicionar novo aluno"
					onClick={this.handleAdd}
					_add={add_student}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<StudentsNew add_student={add_student} onAdd={onAddStudents} />
						<StudentsList
							onSortEnd={onSortEnd}
							students={students}
							onEditStudents={onEditStudents}
							onDeleteStudents={onDeleteStudents}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withStudents(StudentsPage);
