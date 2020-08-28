import React from "react";

import CarsContext from "./CarsContext";

const withCars = (Component) => (props) => (
	<CarsContext.Consumer>
		{(context) => <Component {...props} {...context} />}
	</CarsContext.Consumer>
);

export default withCars;
