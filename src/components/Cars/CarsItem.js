import React, { Component, Fragment } from "react";
import { sortableElement } from "react-sortable-hoc";
import { withRouter } from "react-router-dom";

import Item from "../Item/Item";
import ItemEditing from "../Item/ItemEditing";
import ItemButton from "../Item/ItemButton";

class CarsItem extends Component {
	state = {
		isEditing: false,
	};

	handleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	handleSave = () => {
		this.props.onEditCars({
			id: this.props.id,
			descricao: this.input.value,
		});
		this.handleEditing();
	};

	render() {
		const {
			id,
			descricao,
			qtd,
			onDeleteCars,
			onDefineCar,
			history,
		} = this.props;
		const { isEditing } = this.state;
		return (
			<Item id={id}>
				{isEditing ? (
					<ItemEditing
						defaultValue={descricao}
						thisInput={(c) => {
							this.input = c;
						}}
						onKeyPress={(event) => {
							if (event.key === "Enter") this.handleSave();
						}}
						Editing={this.handleEditing}
						Save={this.handleSave}
					/>
				) : (
					<Fragment>
						<div className="item__text">
							<span>
								{descricao}
								<br />
								<span className="item__text__qtd">
									{qtd
										? qtd + " professor" + (qtd > 1 ? "s" : "")
										: "nenhum professor"}
								</span>
							</span>
						</div>
						<ItemButton
							title="Atribuir professor"
							onClick={() => {
								onDefineCar(id, descricao);
								history.push("/teacher_cars");
							}}
						>
							people
						</ItemButton>
						<ItemButton title="Editar carro" onClick={this.handleEditing}>
							edit
						</ItemButton>
					</Fragment>
				)}
				<ItemButton
					disabled={qtd || this.state.isEditing}
					title={qtd ? "Carro com professor registrado" : "Excluir carro"}
					onClick={() => {
						if (!qtd) onDeleteCars(id);
					}}
				>
					delete
				</ItemButton>
			</Item>
		);
	}
}

export default sortableElement(withRouter(CarsItem));
