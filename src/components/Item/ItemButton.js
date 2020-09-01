import React from "react";

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

export default ItemButton;
