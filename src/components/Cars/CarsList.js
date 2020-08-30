import React from "react";
import { sortableContainer } from "react-sortable-hoc";

import CarsItem from "./CarsItem";
import ItemList from "../ItemList/ItemList";

const CarsList = sortableContainer(
	({ cars, onEditCars, onDeleteCars, onDefineCar }) => (
		<ItemList>
			{cars.map(({ id, description, idTeacher }, i) => (
				<CarsItem
					key={id}
					index={i}
					id={id}
					description={description}
					idTeacher={idTeacher}
					onEditCars={onEditCars}
					onDeleteCars={onDeleteCars}
					onDefineCar={onDefineCar}
				/>
			))}
		</ItemList>
	)
);

export default CarsList;
