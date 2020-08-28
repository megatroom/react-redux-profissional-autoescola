import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import TheoreticalClassesContext from "./TheoreticalClassesContext";
import { TheoreticalClassService } from "../../services";
import withApp from "../App/withApp";

class TheoreticalClassesProvider extends Component {
	state = {
		theoretical_classes: [],
		turma: { id: "", nome: "" },
	};

	componentDidMount() {
		this.handleReloadTheoreticalClasses();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ theoretical_classes }) => ({
			theoretical_classes: arrayMove(theoretical_classes, oldIndex, newIndex),
		}));
		this.handleSaveTheoreticalClasses(this.state.theoretical_classes);
	};

	handleDefineTheoreticalClass = (id, nome) => {
		this.setState({ turma: { id: id, nome: nome } });
	};

	//#region theoretical_classes
	handleAddTheoreticalClasses = (nome) => {
		this.setState((prevState) => {
			const theoretical_classes = prevState.theoretical_classes.concat({
				id: uuid(),
				nome: nome,
				qtd: 0,
			});

			this.handleSaveTheoreticalClasses(theoretical_classes);
			return { theoretical_classes };
		});
	};
	handleEditTheoreticalClasses = (params) => {
		const { id, nome, op } = params;
		this.setState((prevState) => {
			const newTheoreticalClasses = prevState.theoretical_classes.slice();
			const i = newTheoreticalClasses.findIndex((a) => a.id === id);
			if (nome) newTheoreticalClasses[i].nome = nome;
			if (op)
				newTheoreticalClasses[i].qtd = eval(
					newTheoreticalClasses[i].qtd + op + "1"
				);

			this.handleSaveTheoreticalClasses(newTheoreticalClasses);
			return { theoretical_classes: newTheoreticalClasses };
		});
	};
	handleDeleteTheoreticalClasses = (id) => {
		this.setState((prevState) => {
			const newTheoreticalClasses = prevState.theoretical_classes.slice();
			const i = newTheoreticalClasses.findIndex((a) => a.id === id);
			newTheoreticalClasses.splice(i, 1);

			this.handleSaveTheoreticalClasses(newTheoreticalClasses);
			return { theoretical_classes: newTheoreticalClasses };
		});
	};
	//#endregion theoretical_classes

	//#region theoretical_classes
	handleReloadTheoreticalClasses = () => {
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		TheoreticalClassService.load()
			.then((theoretical_classes) => {
				this.setState({
					theoretical_classes: theoretical_classes,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSaveTheoreticalClasses = (theoretical_classes) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		TheoreticalClassService.save(theoretical_classes)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion theoretical_classes

	render() {
		const { children, saveHasError } = this.props;
		const { theoretical_classes, turma } = this.state;
		return (
			<TheoreticalClassesContext.Provider
				value={{
					...this.state,
					theoretical_classes: theoretical_classes,
					turma: turma,
					onDefineTheoreticalClass: this.handleDefineTheoreticalClass,
					onAddTheoreticalClasses: this.handleAddTheoreticalClasses,
					onEditTheoreticalClasses: this.handleEditTheoreticalClasses,
					onDeleteTheoreticalClasses: this.handleDeleteTheoreticalClasses,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadTheoreticalClasses,
					saveHasError: saveHasError,
					handleSaveTheoreticalClasses: () => {
						this.handleSaveTheoreticalClasses(theoretical_classes);
					},
				}}
			>
				{children}
			</TheoreticalClassesContext.Provider>
		);
	}
}
export default withApp(TheoreticalClassesProvider);
