import React, { Component } from "react";

import ItemNew from "../ItemNew/ItemNew";

export default class NewAluno extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	componentDidUpdate() {
		if (!this.props.add_aluno && this.state.text) this.setState({ text: "" });
	}

	render() {
		const { onAdd, add_aluno } = this.props;
		const { text } = this.state;
		return (
			<ItemNew
				_add={add_aluno}
				placeholder="Nome do aluno"
				text={text}
				onChange={(event) => {
					this.setState({ text: event.target.value });
				}}
				onKeyPress={(event) => {
					if (text && event.key === "Enter") {
						onAdd(text);
						this.setState({ text: "" });
					}
				}}
				title="Registrar aluno"
				onClick={() => {
					if (text) {
						onAdd(text);
						this.setState({ text: "" });
					}
				}}
				textButton="Incluir Aluno"
			/>
		);
	}
}
