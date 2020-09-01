import React, { Component } from "react";

import ItemNew from "../ItemNew/ItemNew";

export default class NewTeacher extends Component {
	state = { text: "" };

	componentDidUpdate() {
		if (!this.props.add_teacher && this.state.text) this.setState({ text: "" });
	}

	render() {
		const { onAdd, add_teacher, onClick } = this.props;
		const { text } = this.state;
		return (
			<ItemNew
				_add={add_teacher}
				placeholder="Nome do teacher"
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
				title="Registrar teacher"
				onClick={() => {
					if (text) {
						onAdd(text);
						this.setState({ text: "" });
					}
				}}
				textButton="Incluir Teacher"
				onAddNew={onClick}
			/>
		);
	}
}
