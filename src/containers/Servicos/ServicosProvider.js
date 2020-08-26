import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import ServicosContext from "./ServicosContext";
import { ClasseService } from "../../services";
import withApp from "../App/withApp";

class ServicosProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			classes: [],
			turma: { id: "", nome: "" },
		};
	}

	componentDidMount() {
		this.handleReloadClasses();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ classes }) => ({
			classes: arrayMove(classes, oldIndex, newIndex),
		}));
		this.handleSaveClasses(this.state.classes);
	};

	handleDefineClasse = (id, nome) => {
		this.setState({ turma: { id: id, nome: nome } });
	};

	//#region classes
	handleAddClasses = (nome) => {
		this.setState((prevState) => {
			const classes = prevState.classes.concat({
				id: uuid(),
				nome: nome,
				qtd: 0,
			});

			this.handleSaveClasses(classes);
			return { classes };
		});
	};
	handleEditClasses = (params) => {
		const { id, nome, op } = params;
		this.setState((prevState) => {
			const newClasses = prevState.classes.slice();
			const i = newClasses.findIndex((a) => a.id === id);
			if (nome) newClasses[i].nome = nome;
			if (op) newClasses[i].qtd = eval(newClasses[i].qtd + op + "1");

			this.handleSaveClasses(newClasses);
			return { classes: newClasses };
		});
	};
	handleDeleteClasses = (id) => {
		this.setState((prevState) => {
			const newClasses = prevState.classes.slice();
			const i = newClasses.findIndex((a) => a.id === id);
			newClasses.splice(i, 1);

			this.handleSaveClasses(newClasses);
			return { classes: newClasses };
		});
	};
	//#endregion classes

	//#region classes
	handleReloadClasses = () => {
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		ClasseService.load()
			.then((classes) => {
				this.setState({
					classes: classes,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSaveClasses = (classes) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		ClasseService.save(classes)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion classes

	render() {
		const { children, saveHasError } = this.props;
		const { classes, turma } = this.state;
		return (
			<ServicosContext.Provider
				value={{
					...this.state,
					classes: classes,
					turma: turma,
					onDefineClasse: this.handleDefineClasse,
					onAddClasses: this.handleAddClasses,
					onEditClasses: this.handleEditClasses,
					onDeleteClasses: this.handleDeleteClasses,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadClasses,
					saveHasError: saveHasError,
					handleSaveClasses: () => {
						this.handleSaveClasses(classes);
					},
				}}
			>
				{children}
			</ServicosContext.Provider>
		);
	}
}
export default withApp(ServicosProvider);
