import React from "react";

import ServicosContext from "./ServicosContext";

const withServicos = (Component) => (props) => (
	<ServicosContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</ServicosContext.Consumer>
);

export default withServicos;
