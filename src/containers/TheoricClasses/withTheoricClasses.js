import React from "react";

import TheoricClassesContext from "./TheoricClassesContext";

const withTheoricClasses = (Component) => (props) => (
	<TheoricClassesContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</TheoricClassesContext.Consumer>
);

export default withTheoricClasses;
