import React, { Component } from "react";
import classnames from "classnames";

export default class ClassesNew extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		const { onAdd, add_turma } = this.props;
		const { text } = this.state;
		return (
			<div
				className={classnames("add_turma__input", {
					add_turma__input__transition: add_turma,
				})}
			>
				<div className="new">
					<input
						placeholder="Nome da turma"
						type="text"
						className="new__input"
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
					title="Registrar turma"
					onClick={() => {
						onAdd(text);
						this.setState({ text: "" });
					}}
					className="new__button"
				>
					Incluir Turma
				</button>
			</div>
		);
	}
}
