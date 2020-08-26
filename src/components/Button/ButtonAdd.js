import React from "react";
import classnames from "classnames";

import "./add.scss";

const ButtonAdd = ({ title, onClick, _add }) => (
	<button
		title={title}
		onClick={onClick}
		className={classnames("add_turma__buton material-icons", {
			"add_turma--transition": _add,
		})}
	>
		{_add ? "cancel" : "add_circle_outline"}
	</button>
);

export default ButtonAdd;
