import React, { Component, Fragment } from "react";
import { v1 as uuid } from "uuid";
import { sortableContainer } from "react-sortable-hoc";
import arrayMove from "array-move";
import { withRouter } from "react-router-dom";

import AlunoNew from "../components/AlunoNew";

import AlunoService from "../services/Service";
import ListItem from "../components/AlunoListItem";

const Container = sortableContainer(({ alunos, onEdit, onDelete }) => (
	<div className="alunos__list">
		{alunos.map(({ id, nome }, i) => (
			<ListItem
				key={id}
				index={i}
				id={id}
				nome={nome}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		))}
	</div>
));

class Alunos extends Component {
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

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ alunos }) => ({
			alunos: arrayMove(alunos, oldIndex, newIndex),
		}));
		this.handleSave(this.state.alunos);
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
		const { history } = this.props;
		const { alunos, reloadHasError } = this.state;
		return (
			<div className="alunos">
				<button
					title="Voltar para tela principal"
					className="alunos__back material-icons"
					onClick={() => {
						history.push("/");
					}}
				>
					chevron_left
				</button>
				<span className="alunos__brand">Alunos</span>
				<hr />
				{reloadHasError ? (
					<Error onRetryReload={this.handleReload} />
				) : (
					<Fragment>
						<AlunoNew AddAluno={this.handleAdd} />
						<Container
							onSortEnd={this.onSortEnd}
							alunos={alunos}
							onEdit={this.handleEdit}
							onDelete={this.handleDelete}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withRouter(Alunos);
