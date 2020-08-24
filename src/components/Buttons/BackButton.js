import React from "react";
import { Link } from "react-router-dom";

import "./button.scss";

const BackButton = ({ title, to }) => (
	<Link title={title} className="back material-icons" to={to}>
		chevron_left
	</Link>
);

export default BackButton;
