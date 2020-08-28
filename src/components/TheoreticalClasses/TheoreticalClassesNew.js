import React, { Component } from "react";

import ItemNew from "../ItemNew/ItemNew";

export default class TheoreticalClassesNew extends Component {
	state = { text: "" };

	componentDidUpdate() {
		if (!this.props.add_turma && this.state.text) this.setState({ text: "" });
	}

	render() {
		const { onAdd, add_turma, onClick } = this.props;
		const { text } = this.state;
		return (
			<ItemNew
				_add={add_turma}
				placeholder="Nome da turma"
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
				title="Registrar turma"
				onClick={() => {
					if (text) {
						onAdd(text);
						this.setState({ text: "" });
					}
				}}
				textButton="Incluir Turma"
				onAddNew={onClick}
			/>
		);
	}
}
