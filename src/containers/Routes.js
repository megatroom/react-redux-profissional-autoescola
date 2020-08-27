import React from "react";
import { Switch, Route } from "react-router-dom";

import {
	PageNotFoundPage,
	StudentsPage,
	TheoricClassesPage,
	MainPage,
} from ".";
import { TheoricClassStudent } from "../components";

export const main = [
	{
		Serviços: [
			{
				title: "Controle de turmas",
				desc: "Aula Teórica",
				path: "/theoric_classes",
				icon: "menu_book",
			},
		],
	},
	{
		Cadastros: [
			{
				title: "Controle de alunos",
				desc: "Alunos",
				path: "/students",
				icon: "groups",
			},
		],
	},
];

const Routes = () => (
	<Switch>
		<Route path="/" exact component={MainPage} />
		<Route path="/students" component={StudentsPage} />
		<Route path="/theoric_classes" component={TheoricClassesPage} />
		<Route path="/theoric_class" component={TheoricClassStudent} />
		<Route path="" component={PageNotFoundPage} />
	</Switch>
);

export default Routes;
