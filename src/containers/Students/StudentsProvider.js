import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import StudentsContext from "./StudentsContext";
import { StudentService } from "../../services";
import withApp from "../App/withApp";

class StudentsProvider extends Component {
	state = {
		students: [],
	};

	componentDidMount() {
		this.handleReloadStudents();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ students }) => ({
			students: arrayMove(students, oldIndex, newIndex),
		}));
		this.handleSaveStudents(this.state.students);
	};

	//#region students
	handleAddStudents = (nome) => {
		this.setState((prevState) => {
			const students = prevState.students.concat({
				id: uuid(),
				nome: nome,
				idTurma: null,
			});

			this.handleSaveStudents(students);
			return { students };
		});
	};
	handleEditStudents = (params) => {
		const { id, nome, op, idTurma } = params;
		this.setState((prevState) => {
			const newStudents = prevState.students.slice();
			const i = newStudents.findIndex((a) => a.id === id);
			if (nome) newStudents[i].nome = nome;
			if (op) newStudents[i].idTurma = op === "+" ? idTurma : null;

			this.handleSaveStudents(newStudents);
			return { students: newStudents };
		});
	};
	handleDeleteStudents = (id) => {
		this.setState((prevState) => {
			const newStudents = prevState.students.slice();
			const i = newStudents.findIndex((a) => a.id === id);
			newStudents.splice(i, 1);

			this.handleSaveStudents(newStudents);
			return { students: newStudents };
		});
	};
	//#endregion students

	//#region students
	handleReloadStudents = () => {
		// console.log(
		// 	this.props.handleReloadError ? this.props.handleReloadError : null
		// );
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		StudentService.load()
			.then((students) => {
				this.setState({
					students: students,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSaveStudents = (students) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		StudentService.save(students)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion students

	render() {
		const { children, saveHasError } = this.props;
		const { students } = this.state;
		return (
			<StudentsContext.Provider
				value={{
					...this.state,
					students: students,
					onAddStudents: this.handleAddStudents,
					onEditStudents: this.handleEditStudents,
					onDeleteStudents: this.handleDeleteStudents,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadStudents,
					saveHasError: saveHasError,
					handleSaveStudents: () => {
						this.handleSaveStudents(students);
					},
				}}
			>
				{children}
			</StudentsContext.Provider>
		);
	}
}

export default withApp(StudentsProvider);
