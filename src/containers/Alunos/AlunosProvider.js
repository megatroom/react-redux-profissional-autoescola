import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import AlunosContext from "./AlunosContext";
import { AlunoService } from "../../services";
import withApp from "../App/withApp";

class AlunosProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alunos: [],
		};
	}

	componentDidMount() {
		this.handleReloadAlunos();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ alunos }) => ({
			alunos: arrayMove(alunos, oldIndex, newIndex),
		}));
		this.handleSaveAlunos(this.state.alunos);
	};

	//#region alunos
	handleAddAlunos = (nome) => {
		this.setState((prevState) => {
			const alunos = prevState.alunos.concat({
				id: uuid(),
				nome: nome,
				idTurma: null,
			});

			this.handleSaveAlunos(alunos);
			return { alunos };
		});
	};
	handleEditAlunos = (params) => {
		const { id, nome, op, idTurma } = params;
		this.setState((prevState) => {
			const newAlunos = prevState.alunos.slice();
			const i = newAlunos.findIndex((a) => a.id === id);
			if (nome) newAlunos[i].nome = nome;
			if (op) newAlunos[i].idTurma = op === "+" ? idTurma : null;

			this.handleSaveAlunos(newAlunos);
			return { alunos: newAlunos };
		});
	};
	handleDeleteAlunos = (id) => {
		this.setState((prevState) => {
			const newAlunos = prevState.alunos.slice();
			const i = newAlunos.findIndex((a) => a.id === id);
			newAlunos.splice(i, 1);

			this.handleSaveAlunos(newAlunos);
			return { alunos: newAlunos };
		});
	};
	//#endregion alunos

	//#region alunos
	handleReloadAlunos = () => {
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		AlunoService.load()
			.then((alunos) => {
				this.setState({
					alunos: alunos,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSaveAlunos = (alunos) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		AlunoService.save(alunos)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion alunos

	render() {
		const { children, saveHasError } = this.props;
		const { alunos } = this.state;
		return (
			<AlunosContext.Provider
				value={{
					...this.state,
					alunos: alunos,
					onAddAlunos: this.handleAddAlunos,
					onEditAlunos: this.handleEditAlunos,
					onDeleteAlunos: this.handleDeleteAlunos,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadAlunos,
					saveHasError: saveHasError,
					handleSaveAlunos: () => {
						this.handleSaveAlunos(alunos);
					},
				}}
			>
				{children}
			</AlunosContext.Provider>
		);
	}
}

export default withApp(AlunosProvider);
