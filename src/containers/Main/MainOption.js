import React from "react";

import { ButtonLink } from "../../components";

const MainOption = ({ title, path, icon, desc }) => (
	<ButtonLink title={title} to={path} className="button__option">
		<i className="material-icons">{icon}</i>
		<span>{desc}</span>
	</ButtonLink>
);

export default MainOption;
