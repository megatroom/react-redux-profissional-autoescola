import React, { Component, Fragment } from "react";

import { CarsNew, CarsList, Error, Title } from "../../components";

import withCars from "./withCars";

class CarsPage extends Component {
	state = { add_carro: false };

	handleAdd = () => {
		this.setState({ add_carro: !this.state.add_carro });
	};

	render() {
		const {
			cars,
			onAddCars,
			onEditCars,
			onDeleteCars,
			onSortEnd,
			onRetryReload,
			reloadHasError,
			onDefineCar,
			saveHasError,
			handleSaveCars,
		} = this.props;
		const { add_carro } = this.state;
		return (
			<Fragment>
				<Title
					titleBack="Voltar para tela principal"
					titleAction="Clique para tentar novamente"
					to="/"
					text="Carros"
					saveHasError={saveHasError}
					handleSave={handleSaveCars}
				/>
				{reloadHasError ? (
					<Error onRetryReload={onRetryReload} />
				) : (
					<Fragment>
						<CarsNew
							add_carro={add_carro}
							onAdd={onAddCars}
							onClick={this.handleAdd}
						/>
						<CarsList
							onSortEnd={onSortEnd}
							cars={cars}
							onEditCars={onEditCars}
							onDeleteCars={onDeleteCars}
							onDefineCar={onDefineCar}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

export default withCars(CarsPage);
