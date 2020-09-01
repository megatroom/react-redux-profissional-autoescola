import React from "react";
import classnames from "classnames";

import "./header.scss";

const Header = ({ children, centered }) => (
	<h1 className={classnames("header", { "header--centered": centered })}>
		{children}
	</h1>
);

export default Header;
