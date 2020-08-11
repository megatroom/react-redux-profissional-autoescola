import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { v1 as uuid } from "uuid";
import arrayMove from "array-move";

import AppBar from "../components/AppBar";
import ClasseAluno from "../components/ClasseAluno";
import Main from "./Main";
import Alunos from "./Alunos";
import Servicos from "./Servicos";

import { AlunoService, ClasseService } from "../services/Service";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alunos: [
				// { id: 1, nome: "Jaum" },
				// { id: 2, nome: "Toin" },
				// { id: 3, nome: "Tião" },
				// { id: 4, nome: "Chico" },
			],
			classes: [],
			isLoading: false,
			isOpenMenu: false,
			saveHasError: false,
			reloadHasError: false,
			turma: { id: "", nome: "" },
		};
	}

	componentDidMount() {
		this.handleReloadAlunos();
		this.handleReloadClasses();
	}
	componentDidCatch() {
		this.setState({ reloadHasError: true });
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ alunos }) => ({
			alunos: arrayMove(alunos, oldIndex, newIndex),
		}));
		this.handleSaveAlunos(this.state.alunos);
	};

	//#region handle
	handleReloadError = (value) => {
		this.setState({ reloadHasError: value });
	};
	handleSaveError = (value) => {
		this.setState({ saveHasError: value });
	};
	handleLoading = (value) => {
		this.setState({ isLoading: value });
	};
	handleMenu = (value) => {
		this.setState({ isOpenMenu: value });
	};
	//#endregion handle

	//#region handleDados
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
	handleEditAlunos = (id, nome) => {
		this.setState((prevState) => {
			const newAlunos = prevState.alunos.slice();
			const i = newAlunos.findIndex((a) => a.id === id);
			newAlunos[i].nome = nome;

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
	handleEditClasses = (id, nome) => {
		this.setState((prevState) => {
			const newClasses = prevState.classes.slice();
			const i = newClasses.findIndex((a) => a.id === id);
			newClasses[i].nome = nome;

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
	handleDefineClasse = (id, nome) => {
		this.setState({ turma: { id: id, nome: nome } });
		// console.log(this.state.idClasse);
	};

	getTurma = () => {
		return this.state.turma;
	};

	handleEditAlunoClasse = (op, idA) => {
		this.setState((prevState) => {
			const newClasses = prevState.classes.slice();
			const newAlunos = prevState.alunos.slice();
			const iC = newClasses.findIndex((c) => c.id === this.state.turma.id);
			const iA = newAlunos.findIndex((a) => a.id === idA);
			newAlunos[iA].idTurma = op === "+" ? this.state.turma.id : null;
			newClasses[iC].qtd = eval(newClasses[iC].qtd + op + "1");

			this.handleSaveClasses(newClasses);
			this.handleSaveAlunos(newAlunos);
			return { alunos: newAlunos, classes: newClasses };
		});
	};
	//#endregion handleDados

	//#region storage
	//#region alunos
	handleReloadAlunos = () => {
		this.handleReloadError(false);
		this.handleLoading(true);
		AlunoService.load()
			.then((alunos) => {
				this.setState({
					alunos: alunos,
				});
			})
			.catch(() => {
				this.handleReloadError(true);
			})
			.finally(() => {
				this.handleLoading(false);
			});
	};
	handleSaveAlunos = (alunos) => {
		this.handleSaveError(false);
		this.handleLoading(true);
		AlunoService.save(alunos)
			.then(() => {})
			.catch(() => {
				this.handleSaveError(true);
			})
			.finally(() => {
				this.handleLoading(false);
			});
	};
	//#endregion alunos
	//#region classes
	handleReloadClasses = () => {
		this.handleReloadError(false);
		this.handleLoading(true);
		ClasseService.load()
			.then((classes) => {
				this.setState({
					classes: classes,
				});
			})
			.catch(() => {
				this.handleReloadError(true);
			})
			.finally(() => {
				this.handleLoading(false);
			});
	};
	handleSaveClasses = (classes) => {
		this.handleSaveError(false);
		this.handleLoading(true);
		ClasseService.save(classes)
			.then(() => {})
			.catch(() => {
				this.handleSaveError(true);
			})
			.finally(() => {
				this.handleLoading(false);
			});
	};
	//#endregion classes
	//#endregion storage

	render() {
		const {
			alunos,
			classes,
			isLoading,
			isOpenMenu,
			reloadHasError,
			saveHasError,
			turma,
		} = this.state;
		return (
			<Router>
				<div>
					<AppBar
						isLoading={isLoading}
						saveHasError={saveHasError}
						handleSaveAlunos={() => {
							this.handleSaveAlunos(alunos);
						}}
						handleSaveClasses={() => {
							this.handleSaveClasses(classes);
						}}
					/>
					<div className="container">
						<Route path="/" exact render={(props) => <Main />} />
						<Route
							path="/alunos"
							render={(props) => (
								<Alunos
									alunos={alunos}
									onAddAlunos={this.handleAddAlunos}
									onEditAlunos={this.handleEditAlunos}
									onDeleteAlunos={this.handleDeleteAlunos}
									onSortEnd={this.onSortEnd}
									onRetryReload={this.handleReloadAlunos}
									reloadHasError={reloadHasError}
								/>
							)}
						/>
						<Route
							path="/servicos"
							render={(props) => (
								<Servicos
									classes={classes}
									onAddClasses={this.handleAddClasses}
									onEditClasses={this.handleEditClasses}
									onDeleteClasses={this.handleDeleteClasses}
									onRetryReload={this.handleReloadClasses}
									onDefineClasse={this.handleDefineClasse}
									reloadHasError={reloadHasError}
								/>
							)}
						/>
						<Route
							path="/turma"
							render={(props) => (
								<ClasseAluno
									alunos={alunos}
									turma={turma.nome}
									onEditAlunoClasse={this.handleEditAlunoClasse}
								/>
							)}
						/>
					</div>
				</div>
			</Router>
		);
	}
}
