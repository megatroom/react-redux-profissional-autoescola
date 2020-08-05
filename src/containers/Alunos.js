import React, { Component } from "react";
import { v1 as uuid } from "uuid";

import AlunoNew from "../components/AlunoNew";

import AlunoService from "../services/Service";
import ListItem from "../components/AlunoListItem";

export default class Alunos extends Component {
	constructor(props) {
		super(props);
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

	// componentDidUpdate() {
	// 	if (!!this.state.alunos) this.handleSave(this.state.alunos);
	// 	console.log(!!this.state.alunos);
	// }

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
		this.setState({ isLoading: true, reloadHasError: false });
		AlunoService.load()
			.then((alunos) => {
				this.setState({
					alunos: alunos,
					isLoading: false,
				});
			})
			.catch(() => {
				this.setState({
					isLoading: false,
					reloadHasError: true,
				});
			});
	};

	handleSave = (alunos) => {
		this.setState({ isLoading: true, saveHasError: false });
		AlunoService.save(alunos)
			.then(() => {
				this.setState({ isLoading: false });
			})
			.catch(() => {
				this.setState({
					isLoading: false,
					saveHasError: true,
				});
			});
	};

	render() {
		const { alunos } = this.state;
		return (
			<div className="alunos">
				<span className="alunos__brand">Alunos</span>
				<hr />
				<AlunoNew AddAluno={this.handleAdd} />
				<div className="alunos__list">
					{alunos.map(({ id, nome }) => (
						<ListItem
							key={id}
							id={id}
							nome={nome}
							onEdit={this.handleEdit}
							onDelete={this.handleDelete}
						/>
					))}
				</div>
			</div>
		);
	}
}
