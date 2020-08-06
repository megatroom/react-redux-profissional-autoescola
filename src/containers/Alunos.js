import React, { Component, Fragment } from "react";
import { sortableContainer } from "react-sortable-hoc";
import { withRouter } from "react-router-dom";

import AlunoNew from "../components/AlunoNew";
import ListItem from "../components/AlunoListItem";
import Error from "../components/Error";

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
		this.state = {};
	}

	render() {
		const {
			alunos,
			onAddAlunos,
			onEditAlunos,
			onDeleteAlunos,
			onSortEnd,
			history,
			reloadHasError,
		} = this.props;
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
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<AlunoNew onAdd={onAddAlunos} />
						<Container
							onSortEnd={onSortEnd}
							alunos={alunos}
							onEdit={onEditAlunos}
							onDelete={onDeleteAlunos}
						/>
					</Fragment>
				)}
			</div>
		);
	}
}

export default withRouter(Alunos);
