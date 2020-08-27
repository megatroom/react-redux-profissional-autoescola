import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import TheoricClassesContext from "./TheoricClassesContext";
import { TheoricClassService } from "../../services";
import withApp from "../App/withApp";

class TheoricClassesProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theoric_classes: [],
			turma: { id: "", nome: "" },
		};
	}

	componentDidMount() {
		this.handleReloadTheoricClasses();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ theoric_classes }) => ({
			theoric_classes: arrayMove(theoric_classes, oldIndex, newIndex),
		}));
		this.handleSaveTheoricClasses(this.state.theoric_classes);
	};

	handleDefineTheoricClass = (id, nome) => {
		this.setState({ turma: { id: id, nome: nome } });
	};

	//#region theoric_classes
	handleAddTheoricClasses = (nome) => {
		this.setState((prevState) => {
			const theoric_classes = prevState.theoric_classes.concat({
				id: uuid(),
				nome: nome,
				qtd: 0,
			});

			this.handleSaveTheoricClasses(theoric_classes);
			return { theoric_classes };
		});
	};
	handleEditTheoricClasses = (params) => {
		const { id, nome, op } = params;
		this.setState((prevState) => {
			const newTheoricClasses = prevState.theoric_classes.slice();
			const i = newTheoricClasses.findIndex((a) => a.id === id);
			if (nome) newTheoricClasses[i].nome = nome;
			if (op)
				newTheoricClasses[i].qtd = eval(newTheoricClasses[i].qtd + op + "1");

			this.handleSaveTheoricClasses(newTheoricClasses);
			return { theoric_classes: newTheoricClasses };
		});
	};
	handleDeleteTheoricClasses = (id) => {
		this.setState((prevState) => {
			const newTheoricClasses = prevState.theoric_classes.slice();
			const i = newTheoricClasses.findIndex((a) => a.id === id);
			newTheoricClasses.splice(i, 1);

			this.handleSaveTheoricClasses(newTheoricClasses);
			return { theoric_classes: newTheoricClasses };
		});
	};
	//#endregion theoric_classes

	//#region theoric_classes
	handleReloadTheoricClasses = () => {
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		TheoricClassService.load()
			.then((theoric_classes) => {
				this.setState({
					theoric_classes: theoric_classes,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSaveTheoricClasses = (theoric_classes) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		TheoricClassService.save(theoric_classes)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion theoric_classes

	render() {
		const { children, saveHasError } = this.props;
		const { theoric_classes, turma } = this.state;
		return (
			<TheoricClassesContext.Provider
				value={{
					...this.state,
					theoric_classes: theoric_classes,
					turma: turma,
					onDefineTheoricClass: this.handleDefineTheoricClass,
					onAddTheoricClasses: this.handleAddTheoricClasses,
					onEditTheoricClasses: this.handleEditTheoricClasses,
					onDeleteTheoricClasses: this.handleDeleteTheoricClasses,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadTheoricClasses,
					saveHasError: saveHasError,
					handleSaveTheoricClasses: () => {
						this.handleSaveTheoricClasses(theoric_classes);
					},
				}}
			>
				{children}
			</TheoricClassesContext.Provider>
		);
	}
}
export default withApp(TheoricClassesProvider);
