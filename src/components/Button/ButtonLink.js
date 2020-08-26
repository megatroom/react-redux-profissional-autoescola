import React from "react";
import { Link } from "react-router-dom";

import "./button.scss";

const ButtonLink = ({ children, title, typeClass = "button", to }) => (
	<Link title={title} className={typeClass} to={to}>
		{children}
	</Link>
);

export default ButtonLink;
