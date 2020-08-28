import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import PracticalClassesContext from "./PracticalClassesContext";
import { PracticalClassService } from "../../services";
import withApp from "../App/withApp";

class PracticalClassesProvider extends Component {
	state = {
		Practical_classes: [],
		turma: { id: "", nome: "" },
	};

	componentDidMount() {
		this.handleReloadPracticalClasses();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ Practical_classes }) => ({
			Practical_classes: arrayMove(Practical_classes, oldIndex, newIndex),
		}));
		this.handleSavePracticalClasses(this.state.Practical_classes);
	};

	handleDefinePracticalClass = (id, nome) => {
		this.setState({ turma: { id: id, nome: nome } });
	};

	//#region Practical_classes
	handleAddPracticalClasses = (nome) => {
		this.setState((prevState) => {
			const Practical_classes = prevState.Practical_classes.concat({
				id: uuid(),
				nome: nome,
				qtd: 0,
			});

			this.handleSavePracticalClasses(Practical_classes);
			return { Practical_classes };
		});
	};
	handleEditPracticalClasses = (params) => {
		const { id, nome, op } = params;
		this.setState((prevState) => {
			const newPracticalClasses = prevState.Practical_classes.slice();
			const i = newPracticalClasses.findIndex((a) => a.id === id);
			if (nome) newPracticalClasses[i].nome = nome;
			if (op)
				newPracticalClasses[i].qtd = eval(
					newPracticalClasses[i].qtd + op + "1"
				);

			this.handleSavePracticalClasses(newPracticalClasses);
			return { Practical_classes: newPracticalClasses };
		});
	};
	handleDeletePracticalClasses = (id) => {
		this.setState((prevState) => {
			const newPracticalClasses = prevState.Practical_classes.slice();
			const i = newPracticalClasses.findIndex((a) => a.id === id);
			newPracticalClasses.splice(i, 1);

			this.handleSavePracticalClasses(newPracticalClasses);
			return { Practical_classes: newPracticalClasses };
		});
	};
	//#endregion Practical_classes

	//#region Practical_classes
	handleReloadPracticalClasses = () => {
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		PracticalClassService.load()
			.then((Practical_classes) => {
				this.setState({
					Practical_classes: Practical_classes,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSavePracticalClasses = (Practical_classes) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		PracticalClassService.save(Practical_classes)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion Practical_classes

	render() {
		const { children, saveHasError } = this.props;
		const { Practical_classes, turma } = this.state;
		return (
			<PracticalClassesContext.Provider
				value={{
					...this.state,
					Practical_classes: Practical_classes,
					turma: turma,
					onDefinePracticalClass: this.handleDefinePracticalClass,
					onAddPracticalClasses: this.handleAddPracticalClasses,
					onEditPracticalClasses: this.handleEditPracticalClasses,
					onDeletePracticalClasses: this.handleDeletePracticalClasses,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadPracticalClasses,
					saveHasError: saveHasError,
					handleSavePracticalClasses: () => {
						this.handleSavePracticalClasses(Practical_classes);
					},
				}}
			>
				{children}
			</PracticalClassesContext.Provider>
		);
	}
}
export default withApp(PracticalClassesProvider);
