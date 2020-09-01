import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import PracticalClassesContext from "./PracticalClassesContext";
import { PracticalClassService } from "../../services";
import withApp from "../App/withApp";

class PracticalClassesProvider extends Component {
	state = {
		practical_classes: [],
		schedule: { id: "", description: "" },
	};

	componentDidMount() {
		this.handleReloadPracticalClasses();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ practical_classes }) => ({
			practical_classes: arrayMove(practical_classes, oldIndex, newIndex),
		}));
		this.handleSavePracticalClasses(this.state.practical_classes);
	};

	handleDefinePracticalClass = (id, description, idTeacher) => {
		this.setState({
			schedule: { id: id, description: description },
		});
	};

	//#region practical_classes
	handleAddPracticalClasses = (description) => {
		this.setState((prevState) => {
			const practical_classes = prevState.practical_classes.concat({
				id: uuid(),
				description: description,
				students: [],
			});

			this.handleSavePracticalClasses(practical_classes);
			return { practical_classes };
		});
	};
	handleEditPracticalClasses = ({ id, description, att, schedule }) => {
		this.setState((prevState) => {
			const newPracticalClasses = prevState.practical_classes.slice();
			const i = newPracticalClasses.findIndex((a) => a.id === id);
			if (description) newPracticalClasses[i].description = description;
			console.log(att, schedule);
			// if (idCarro)
			// 	if (att)
			// 		newTeachers[i].cars = newTeachers[i].cars.concat({
			// 			idCarro: idCarro,
			// 		});
			// 	else
			// 		newTeachers[i].cars.splice(
			// 			newTeachers[i].cars.findIndex((c) => c.idCarro === idCarro),
			// 			1
			// 		);

			this.handleSavePracticalClasses(newPracticalClasses);
			return { practical_classes: newPracticalClasses };
		});
	};
	handleDeletePracticalClasses = (id) => {
		this.setState((prevState) => {
			const newPracticalClasses = prevState.practical_classes.slice();
			const i = newPracticalClasses.findIndex((a) => a.id === id);
			newPracticalClasses.splice(i, 1);

			this.handleSavePracticalClasses(newPracticalClasses);
			return { practical_classes: newPracticalClasses };
		});
	};
	//#endregion practical_classes

	//#region practical_classes
	handleReloadPracticalClasses = () => {
		// this.props.handleReloadError(false);
		// this.props.handleLoading(true);
		PracticalClassService.load()
			.then((practical_classes) => {
				this.setState({
					practical_classes: practical_classes,
				});
			})
			.catch(() => {
				// this.props.handleReloadError(true);
			})
			.finally(() => {
				// this.props.handleLoading(false);
			});
	};
	handleSavePracticalClasses = (practical_classes) => {
		// this.props.handleSaveError(false);
		// this.props.handleLoading(true);
		PracticalClassService.save(practical_classes)
			.then(() => {})
			.catch(() => {
				// this.props.handleSaveError(true);
			})
			.finally(() => {
				// this.props.handleLoading(false);
			});
	};
	//#endregion practical_classes

	render() {
		const { children, saveHasError } = this.props;
		const { practical_classes, schedule } = this.state;
		return (
			<PracticalClassesContext.Provider
				value={{
					...this.state,
					practical_classes: practical_classes,
					schedule: schedule,
					onDefinePracticalClass: this.handleDefinePracticalClass,
					onAddPracticalClasses: this.handleAddPracticalClasses,
					onEditPracticalClasses: this.handleEditPracticalClasses,
					onDeletePracticalClasses: this.handleDeletePracticalClasses,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadPracticalClasses,
					saveHasError: saveHasError,
					handleSavePracticalClasses: () => {
						this.handleSavePracticalClasses(practical_classes);
					},
				}}
			>
				{children}
			</PracticalClassesContext.Provider>
		);
	}
}
export default withApp(PracticalClassesProvider);
