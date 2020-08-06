import React, { Component, Fragment } from "react";

export default class NewAluno extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		const { onAdd } = this.props;
		const { text } = this.state;
		return (
			<Fragment>
				<div className="alunos__new">
					<input
						placeholder="Nome do aluno"
						type="text"
						className="alunos__new__input"
						value={text}
						onChange={(event) => {
							this.setState({ text: event.target.value });
						}}
						onKeyPress={(event) => {
							if (event.key === "Enter") {
								onAdd(text);
								this.setState({ text: "" });
							}
						}}
					/>
				</div>
				<button
					title="Registrar aluno"
					onClick={() => {
						onAdd(text);
						this.setState({ text: "" });
					}}
					className="alunos__new__button"
				>
					Incluir Aluno
				</button>
			</Fragment>
		);
	}
}
