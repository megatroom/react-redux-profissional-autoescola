import React from "react";

import "./button.scss";

const Button = ({ children, onClick }) => (
	<button className="button" onClick={onClick}>
		{children}
	</button>
);

export default Button;
