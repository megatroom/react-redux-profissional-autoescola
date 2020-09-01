import React from "react";
import { withRouter } from "react-router-dom";

import TeachersList from "../Teachers/TeachersList";
import Title from "../Title/Title";

import withTeachers from "../../containers/Teachers/withTeachers";
import withCars from "../../containers/Cars/withCars";

const TeacherCars = ({
	carro,
	teachers,
	onEditCars,
	onEditTeachers,
	history,
}) => {
	if (!carro.id) history.push("/cars");
	return (
		<div>
			<Title title="Voltar para carros" to="/cars" text={carro.description} />
			<TeachersList
				teachers={teachers}
				onEditTeachers={onEditTeachers}
				onEditCars={onEditCars}
				carro={carro}
				idTeacher={carro.idTeacher} // identificador do professor
			/>
		</div>
	);
};

export default withRouter(withCars(withTeachers(TeacherCars)));
