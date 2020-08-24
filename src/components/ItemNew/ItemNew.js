import React from "react";
import classnames from "classnames";

import "./new.scss";

const ItemNew = ({
	_add,
	placeholder,
	text,
	onChange,
	onKeyPress,
	title,
	onClick,
	textButton,
}) => (
	<div className={classnames("new", { new__transition: _add })}>
		<input
			placeholder={placeholder}
			type="text"
			className="new__input"
			value={text}
			onChange={onChange}
			onKeyPress={onKeyPress}
		/>
		<button title={title} className="new__button" onClick={onClick}>
			{textButton}
		</button>
	</div>
);

export default ItemNew;
