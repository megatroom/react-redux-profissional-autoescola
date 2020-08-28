import React from "react";

import TheoreticalClassesContext from "./TheoreticalClassesContext";

const withTheoreticalClasses = (Component) => (props) => (
	<TheoreticalClassesContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</TheoreticalClassesContext.Consumer>
);

export default withTheoreticalClasses;
