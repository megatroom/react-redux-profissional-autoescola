import React from "react";

import AlunosContext from "./AlunosContext";

const withAlunos = (Component) => (props) => (
	<AlunosContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</AlunosContext.Consumer>
);

export default withAlunos;
