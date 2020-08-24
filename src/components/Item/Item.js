import React from "react";

import "./item.scss";

const Item = ({ children, id, title }) => (
	<div key={id} className="item" title={title}>
		{children}
	</div>
);

export default Item;
