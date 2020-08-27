import React, { Fragment } from "react";
import classnames from "classnames";

import { ButtonAdd } from "..";

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
	onAddNew,
}) => (
	<Fragment>
		<div
			className={classnames("new", {
				new__transition: _add,
			})}
		>
			<input
				placeholder={placeholder}
				type="text"
				className="new__input"
				value={text}
				onChange={onChange}
				onKeyPress={onKeyPress}
			/>
		</div>
		<ButtonAdd title="Adicionar nova turma" onClick={onAddNew} _add={_add} />
		<button
			title={title}
			className={classnames("new__button", {
				new__transition: _add,
			})}
			onClick={onClick}
		>
			{textButton}
		</button>
	</Fragment>
);

export default ItemNew;
