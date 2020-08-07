import React, { Component, Fragment } from "react";

export default class ClassesNew extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		const { onAdd } = this.props;
		const { text } = this.state;
		return (
			<Fragment>
				<div className="new">
					<input
						placeholder="Nome do classe"
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
					title="Registrar classe"
					onClick={() => {
						onAdd(text);
						this.setState({ text: "" });
					}}
					className="new__button"
				>
					Incluir Classe
				</button>
			</Fragment>
		);
	}
}
