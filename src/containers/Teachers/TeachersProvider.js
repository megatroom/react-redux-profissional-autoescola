import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import TeachersContext from "./TeachersContext";
import { TeacherService } from "../../services";
import withApp from "../App/withApp";

class TeachersProvider extends Component {
	state = {
		teachers: [],
	};

	componentDidMount() {
		this.handleReloadTeachers();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ teachers }) => ({
			teachers: arrayMove(teachers, oldIndex, newIndex),
		}));
		this.handleSaveTeachers(this.state.teachers);
	};

	//#region teachers
	handleAddTeachers = (name) => {
		this.setState((prevState) => {
			const teachers = prevState.teachers.concat({
				id: uuid(),
				name: name,
				cars: [],
			});

			this.handleSaveTeachers(teachers);
			return { teachers };
		});
	};
	handleEditTeachers = ({ id, name, att, idCarro }) => {
		this.setState((prevState) => {
			const newTeachers = prevState.teachers.slice();
			const i = newTeachers.findIndex((t) => t.id === id);
			if (name) newTeachers[i].name = name;
			if (idCarro)
				if (att)
					newTeachers[i].cars = newTeachers[i].cars.concat({
						idCarro: idCarro,
					});
				else
					newTeachers[i].cars.splice(
						newTeachers[i].cars.findIndex((c) => c.idCarro === idCarro),
						1
					);

			this.handleSaveTeachers(newTeachers);
			return { teachers: newTeachers };
		});
	};
	handleDeleteTeachers = (id) => {
		this.setState((prevState) => {
			const newTeachers = prevState.teachers.slice();
			const i = newTeachers.findIndex((t) => t.id === id);
			newTeachers.splice(i, 1);

			this.handleSaveTeachers(newTeachers);
			return { teachers: newTeachers };
		});
	};
	//#endregion teachers

	//#region teachers
	handleReloadTeachers = () => {
		// this.props.handleReloadError(false);
		// this.props.handleLoading(true);
		TeacherService.load()
			.then((teachers) => {
				this.setState({
					teachers: teachers,
				});
			})
			.catch(() => {
				// this.props.handleReloadError(true);
			})
			.finally(() => {
				// this.props.handleLoading(false);
			});
	};
	handleSaveTeachers = (teachers) => {
		// this.props.handleSaveError(false);
		// this.props.handleLoading(true);
		TeacherService.save(teachers)
			.then(() => {})
			.catch(() => {
				// this.props.handleSaveError(true);
			})
			.finally(() => {
				// this.props.handleLoading(false);
			});
	};
	//#endregion teachers

	render() {
		const { children, saveHasError } = this.props;
		const { teachers } = this.state;
		return (
			<TeachersContext.Provider
				value={{
					...this.state,
					teachers: teachers,
					onAddTeachers: this.handleAddTeachers,
					onEditTeachers: this.handleEditTeachers,
					onDeleteTeachers: this.handleDeleteTeachers,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadTeachers,
					saveHasError: saveHasError,
					handleSaveTeachers: () => {
						this.handleSaveTeachers(teachers);
					},
				}}
			>
				{children}
			</TeachersContext.Provider>
		);
	}
}

export default withApp(TeachersProvider);
