import React from "react";
import { Switch, Route } from "react-router-dom";

import {
	TeachersPage,
	CarsPage,
	PracticalClassesPage,
	StudentsPage,
	PageNotFoundPage,
	TheoreticalClassesPage,
	MainPage,
} from ".";
import { TeacherCars, TheoreticalClassStudent } from "../components";

export const main = [
	{
		Serviços: [
			{
				title: "Controle de turmas teóricas",
				desc: "Aula Teórica",
				path: "/theoretical_classes",
				icon: "menu_book",
			},
			{
				title: "Controle de turmas práticas",
				desc: "Aula Prática",
				path: "/practical_classes",
				icon: "speed",
			},
		],
	},
	{
		Cadastros: [
			{
				title: "Controle de alunos",
				desc: "Alunos",
				path: "/students",
				icon: "person",
			},
			{
				title: "Controle de professores",
				desc: "Professores",
				path: "/teachers",
				icon: "visibility",
			},
			{
				title: "Controle de carros",
				desc: "Carros",
				path: "/cars",
				icon: "drive_eta",
			},
		],
	},
];

const Routes = () => (
	<Switch>
		<Route path="/" exact component={MainPage} />
		<Route path="/teachers" component={TeachersPage} />
		<Route path="/cars" component={CarsPage} />
		<Route path="/practical_classes" component={PracticalClassesPage} />
		<Route path="/theoretical_classes" component={TheoreticalClassesPage} />
		<Route path="/students" component={StudentsPage} />
		<Route path="/theoretical_class" component={TheoreticalClassStudent} />
		<Route path="/teacher_cars" component={TeacherCars} />
		<Route path="" component={PageNotFoundPage} />
	</Switch>
);

export default Routes;
