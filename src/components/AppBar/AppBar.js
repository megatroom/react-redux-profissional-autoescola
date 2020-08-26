import React from "react";

import "./app-bar.scss";
import ButtonAction from "../Button/ButtonAction";

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
