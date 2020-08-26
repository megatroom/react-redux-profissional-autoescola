import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

import "./navigation_drawer.scss";
import MenuItem from "./MenuItem";

const NavigationDrawer = ({
	menu,
	isOpenMenu,
	onCloseMenu,
	history,
	location,
}) => (
	<div
		className={classnames("navigation_drawer", {
			"navigation_drawer--open": isOpenMenu,
		})}
	>
		<div className="navigation_drawer__head">
			<button
				className="navigation_drawer__head__button material-icons"
				onClick={onCloseMenu}
			>
				close
			</button>
		</div>
		<div className="navigation_drawer__menu">
			{menu.map(({ icon, label, path }) => (
				<MenuItem
					key={icon}
					isActive={location.pathname === path}
					icon={icon}
					label={label}
					onClick={() => {
						onCloseMenu();
						history.push(path);
					}}
				/>
			))}
		</div>
	</div>
);

export default withRouter(NavigationDrawer);
