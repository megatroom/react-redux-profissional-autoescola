import React from "react";
import classnames from "classnames";

import withSettings from "../../containers/Settings/withSettings";

const MenuItem = ({ isActive, onClick, icon, label, theme }) => {
	return (
		<button
			className={classnames("navigation_drawer__menu__item", {
				"navigation_drawer__menu__item--active": isActive,
			})}
			onClick={onClick}
			style={
				theme &&
				theme.navBar && { color: isActive && theme.navBar.backgroundColor }
			}
		>
			<i className="material-icons">{icon}</i>
			<span>{label}</span>
		</button>
	);
};

export default withSettings(MenuItem);
