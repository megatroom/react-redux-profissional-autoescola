import React, { Component } from "react";

import ItemNew from "../ItemNew/ItemNew";

export default class NewStudent extends Component {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	componentDidUpdate() {
		if (!this.props.add_student && this.state.text) this.setState({ text: "" });
	}

	render() {
		const { onAdd, add_student, onClick } = this.props;
		const { text } = this.state;
		return (
			<ItemNew
				_add={add_student}
				placeholder="Nome do student"
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
				title="Registrar student"
				onClick={() => {
					if (text) {
						onAdd(text);
						this.setState({ text: "" });
					}
				}}
				textButton="Incluir Student"
				onAddNew={onClick}
			/>
		);
	}
}
