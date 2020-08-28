import React, { Component } from "react";
import arrayMove from "array-move";
import { v1 as uuid } from "uuid";

import CarsContext from "./CarsContext";
import { CarService } from "../../services";
import withApp from "../App/withApp";

class CarsProvider extends Component {
	state = {
		cars: [],
		carro: { id: "", descricao: "" },
	};

	componentDidMount() {
		this.handleReloadCars();
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ cars }) => ({
			cars: arrayMove(cars, oldIndex, newIndex),
		}));
		this.handleSaveCars(this.state.cars);
	};

	handleDefineCar = (id, descricao) => {
		this.setState({ carro: { id: id, descricao: descricao } });
	};

	//#region cars
	handleAddCars = (descricao) => {
		this.setState((prevState) => {
			const cars = prevState.cars.concat({
				id: uuid(),
				descricao: descricao,
				idTeacher: null,
			});

			this.handleSaveCars(cars);
			return { cars };
		});
	};
	handleEditCars = ({ id, descricao, att, idTeacher }) => {
		this.setState((prevState) => {
			const newCars = prevState.cars.slice();
			const i = newCars.findIndex((a) => a.id === id);
			if (descricao) newCars[i].descricao = descricao;
			if (idTeacher)
				//newCars[i].idTeacher = att ? idTeacher : null;
				console.log(att, idTeacher);

			this.handleSaveCars(newCars);
			return { cars: newCars };
		});
	};
	handleDeleteCars = (id) => {
		this.setState((prevState) => {
			const newCars = prevState.cars.slice();
			const i = newCars.findIndex((a) => a.id === id);
			newCars.splice(i, 1);

			this.handleSaveCars(newCars);
			return { cars: newCars };
		});
	};
	//#endregion cars

	//#region cars
	handleReloadCars = () => {
		this.props.handleReloadError(false);
		this.props.handleLoading(true);
		CarService.load()
			.then((cars) => {
				this.setState({
					cars: cars,
				});
			})
			.catch(() => {
				this.props.handleReloadError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	handleSaveCars = (cars) => {
		this.props.handleSaveError(false);
		this.props.handleLoading(true);
		CarService.save(cars)
			.then(() => {})
			.catch(() => {
				this.props.handleSaveError(true);
			})
			.finally(() => {
				this.props.handleLoading(false);
			});
	};
	//#endregion cars

	render() {
		const { children, saveHasError } = this.props;
		const { cars, carro } = this.state;
		return (
			<CarsContext.Provider
				value={{
					...this.state,
					cars: cars,
					carro: carro,
					onDefineCar: this.handleDefineCar,
					onAddCars: this.handleAddCars,
					onEditCars: this.handleEditCars,
					onDeleteCars: this.handleDeleteCars,
					onSortEnd: this.onSortEnd,
					onRetryReload: this.handleReloadCars,
					saveHasError: saveHasError,
					handleSaveCars: () => {
						this.handleSaveCars(cars);
					},
				}}
			>
				{children}
			</CarsContext.Provider>
		);
	}
}
export default withApp(CarsProvider);
