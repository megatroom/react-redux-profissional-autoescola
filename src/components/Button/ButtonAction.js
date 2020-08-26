import React from "react";

import "./action.scss";

const ButtonAction = ({ title, type, onClick, icon }) => {
	type = type ? " action--" + type : "";
	return (
		<button
			title={title}
			onClick={onClick}
			className={"action material-icons" + type}
		>
			{icon}
		</button>
	);
};

export default ButtonAction;
