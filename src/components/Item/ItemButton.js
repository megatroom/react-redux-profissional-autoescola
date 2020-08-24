import React from "react";
import { Link } from "react-router-dom";

const ItemButton = ({ children, title, onClick, disabled }) => (
	<button
		title={title}
		onClick={onClick}
		className="item__action material-icons"
		disabled={disabled}
	>
		{children}
	</button>
);

// const ItemLink = ({ children, title, onClick, to }) => (
// 	<Link
// 		title={title}
// 		onClick={onClick}
// 		className="item__action item__action--link material-icons"
// 		to={to}
// 	>
// 		{children}
// 	</Link>
// );

export {
	ItemButton as default, //, ItemLink
};
