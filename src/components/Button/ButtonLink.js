import React from "react";
import { Link } from "react-router-dom";

import "./button.scss";

const ButtonLink = ({ children, title, className = "button", to }) => (
	<Link title={title} className={className} to={to}>
		{children}
	</Link>
);

export default ButtonLink;
