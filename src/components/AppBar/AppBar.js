import React from "react";

import ButtonAction from "../Button/ButtonAction";

import "./app-bar.scss";

const AppBar = ({ isLoading }) => (
	<div className="appbar">
		<div className="appbar__container">
			<ButtonAction icon="menu" />
			<span className="appbar__brand">Auto Escola Senna</span>
			{isLoading && <ButtonAction type="rotation" icon="refresh" />}
		</div>
	</div>
);

export default AppBar;
