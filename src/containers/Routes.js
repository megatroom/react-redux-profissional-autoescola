import React from "react";
import { Switch, Route } from "react-router-dom";

import { PageNotFoundPage, AlunosPage, ServicosPage, MainPage } from ".";
import { ClasseAluno } from "../components";

export const main = {
	servicos: [{ desc: "Aula Teórica", path: "/servicos", icon: "menu_book" }],
	cadastros: [{ desc: "Alunos", path: "/alunos", icon: "groups" }],
};
const Routes = ({ reloadHasError }) => (
	<Switch>
		<Route path="/" exact component={MainPage} />
		<Route
			path="/alunos"
			render={(props) => <AlunosPage reloadHasError={reloadHasError} />}
		/>
		<Route
			path="/servicos"
			render={(props) => <ServicosPage reloadHasError={reloadHasError} />}
		/>
		<Route path="/turma" component={ClasseAluno} />
		<Route path="" component={PageNotFoundPage} />
	</Switch>
);

export default Routes;
