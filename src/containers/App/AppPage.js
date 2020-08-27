import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PageLayout from "../PageLayout/PageLayout";
import StudentsProvider from "../Students/StudentsProvider";
import TheoricClassesProvider from "../TheoricClasses/TheoricClassesProvider";
import Routes from "../Routes";
import AppProvider from "./AppProvider";

const AppPage = () => (
	<Router>
		<AppProvider>
			<TheoricClassesProvider>
				<StudentsProvider>
					<PageLayout>
						<Routes />
					</PageLayout>
				</StudentsProvider>
			</TheoricClassesProvider>
		</AppProvider>
	</Router>
);

export default AppPage;
