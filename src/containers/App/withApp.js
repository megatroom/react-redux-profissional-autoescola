import React from "react";
import AppContext from "./AppContext";

const withApp = (Component) => (props) => (
	<AppContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</AppContext.Consumer>
);

export default withApp;
