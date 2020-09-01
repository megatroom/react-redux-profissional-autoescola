import React, { Component } from "react";

import ItemNew from "../ItemNew/ItemNew";

export default class CarsNew extends Component {
	state = { text: "" };

	componentDidUpdate() {
		if (!this.props.add_carro && this.state.text) this.setState({ text: "" });
	}

	render() {
		const { onAdd, add_carro, onClick } = this.props;
		const { text } = this.state;
		return (
			<ItemNew
				_add={add_carro}
				placeholder="Nome da carro"
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
				title="Registrar carro"
				onClick={() => {
					if (text) {
						onAdd(text);
						this.setState({ text: "" });
					}
				}}
				textButton="Incluir Carro"
				onAddNew={onClick}
			/>
		);
	}
}
