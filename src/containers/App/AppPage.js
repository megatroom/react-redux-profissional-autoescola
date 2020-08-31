import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import TeachersProvider from "../Teachers/TeachersProvider";
import CarsProvider from "../Cars/CarsProvider";
import PageLayoutPage from "../PageLayout/PageLayoutPage";
import StudentsProvider from "../Students/StudentsProvider";
import TheoreticalClassesProvider from "../TheoreticalClasses/TheoreticalClassesProvider";
import PracticalClassesProvider from "../PracticalClasses/PracticalClassesProvider";
import Routes from "../Routes";
import AppProvider from "./AppProvider";

const AppPage = () => (
	<Router>
		<AppProvider>
			<TeachersProvider>
				<CarsProvider>
					<TheoreticalClassesProvider>
						<StudentsProvider>
							<PracticalClassesProvider>
								<PageLayoutPage>
									<Routes />
								</PageLayoutPage>
							</PracticalClassesProvider>
						</StudentsProvider>
					</TheoreticalClassesProvider>
				</CarsProvider>
			</TeachersProvider>
		</AppProvider>
	</Router>
);

export default AppPage;
