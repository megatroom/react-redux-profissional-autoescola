import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PageLayout from "../PageLayout/PageLayout";
import AlunosProvider from "../Alunos/AlunosProvider";
import ServicosProvider from "../Servicos/ServicosProvider";
import Routes from "../Routes";
import AppProvider from "./AppProvider";

const AppPage = () => (
	<Router>
		<AppProvider>
			<ServicosProvider>
				<AlunosProvider>
					<PageLayout>
						<Routes />
					</PageLayout>
				</AlunosProvider>
			</ServicosProvider>
		</AppProvider>
	</Router>
);

export default AppPage;
