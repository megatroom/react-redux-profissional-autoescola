import React from "react";
import { BackButton } from "..";

import "./title.scss";

const Title = ({ title, to, text }) => (
	<div className="brand">
		<BackButton title={title} to={to} />
		<span>{text}</span>
		<hr />
	</div>
);

export default Title;
