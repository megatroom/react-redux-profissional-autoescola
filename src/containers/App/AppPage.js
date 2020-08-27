import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PageLayoutPage from "../PageLayout/PageLayoutPage";
import StudentsProvider from "../Students/StudentsProvider";
import TheoricClassesProvider from "../TheoricClasses/TheoricClassesProvider";
import Routes from "../Routes";
import AppProvider from "./AppProvider";

const AppPage = () => (
	<Router>
		<AppProvider>
			<TheoricClassesProvider>
				<StudentsProvider>
					<PageLayoutPage>
						<Routes />
					</PageLayoutPage>
				</StudentsProvider>
			</TheoricClassesProvider>
		</AppProvider>
	</Router>
);

export default AppPage;
