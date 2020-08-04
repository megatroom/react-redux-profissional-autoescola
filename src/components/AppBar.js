import React from "react";
import classnames from "classnames";

const AppBar = () => (
	<div className="appbar">
		<div class="appbar__container">
			<button className="appbar__action material-icons">menu</button>
			<span className="appbar__brand">Auto Escola Senna</span>
			<button class="appbar__action material-icons appbar__action--rotation">
				refresh
			</button>
			<button class="appbar__action material-icons appbar__action--danger">
				cloud_off
			</button>
		</div>
	</div>
);

export default AppBar;
