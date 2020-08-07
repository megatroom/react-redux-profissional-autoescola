import React from "react";
import { withRouter } from "react-router-dom";

const Main = ({ history }) => (
	<div className="main">
		<div className="main__options">
			<span>Serviços</span>
			<hr />
			<button
				onClick={() => {
					history.push("/servicos");
				}}
				className="main__options__button"
			>
				<i className="material-icons">menu_book</i>
				<span>Aula Teórica</span>
			</button>
		</div>
		<div className="main__options">
			<span>Cadastros</span>
			<hr />
			<button
				onClick={() => {
					history.push("/alunos");
				}}
				className="main__options__button"
			>
				<i className="material-icons">groups</i>
				<span>Alunos</span>
			</button>
		</div>
	</div>
);

export default withRouter(Main);
