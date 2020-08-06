import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { v1 as uuid } from "uuid";
import arrayMove from "array-move";

import AppBar from "../components/AppBar";
import Main from "./Main";
import Alunos from "./Alunos";

import AlunoService from "../services/Service";

export default class App extends Component {
	constructor(propos) {
		super(propos);
		this.state = {
			alunos: [
				// { id: 1, nome: "Jaum" },
				// { id: 2, nome: "Toin" },
				// { id: 3, nome: "Tião" },
				// { id: 4, nome: "Chico" },
			],
			isLoading: false,
			isOpenMenu: false,
			saveHasError: false,
			reloadHasError: false,
		};
	}

	componentDidMount() {
		this.handleReload();
	}
	componentDidCatch() {
		this.setState({ reloadHasError: true });
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ alunos }) => ({
			alunos: arrayMove(alunos, oldIndex, newIndex),
		}));
		this.handleSave(this.state.alunos);
	};

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

	handleAdd = (nome) => {
		this.setState((prevState) => {
			const alunos = prevState.alunos.concat({
				id: uuid(),
				nome: nome,
			});

			this.handleSave(alunos);
			return { alunos };
		});
	};
	handleEdit = (id, nome) => {
		this.setState((prevState) => {
			const newAlunos = prevState.alunos.slice();
			const i = newAlunos.findIndex((a) => a.id === id);
			newAlunos[i].nome = nome;

			this.handleSave(newAlunos);
			return { alunos: newAlunos };
		});
	};
	handleDelete = (id) => {
		this.setState((prevState) => {
			const newAlunos = prevState.alunos.slice();
			const i = newAlunos.findIndex((a) => a.id === id);
			newAlunos.splice(i, 1);

			this.handleSave(newAlunos);
			return { alunos: newAlunos };
		});
	};

	handleReload = () => {
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
	handleSave = (alunos) => {
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

	render() {
		const {
			alunos,
			isLoading,
			isOpenMenu,
			reloadHasError,
			saveHasError,
		} = this.state;
		return (
			<Router>
				<div>
					<AppBar
						isLoading={isLoading}
						saveHasError={saveHasError}
						handleSave={() => {
							this.handleSave(alunos);
						}}
					/>
					<div className="container">
						<Route path="/" exact render={(props) => <Main />} />
						<Route
							path="/alunos"
							render={(props) => (
								<Alunos
									alunos={alunos}
									onAddAlunos={this.handleAdd}
									onEditAlunos={this.handleEdit}
									onDeleteAlunos={this.handleDelete}
									onSortEnd={this.onSortEnd}
									reloadHasError={reloadHasError}
									saveHasError={saveHasError}
								/>
							)}
						/>
					</div>
				</div>
			</Router>
		);
	}
}
