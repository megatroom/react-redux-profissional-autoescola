import React from "react";

import PracticalClassesContext from "./PracticalClassesContext";

const withPracticalClasses = (Component) => (props) => (
	<PracticalClassesContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</PracticalClassesContext.Consumer>
);

export default withPracticalClasses;
