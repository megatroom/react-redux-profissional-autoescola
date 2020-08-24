import React, { Fragment } from "react";

const ItemEditing = ({
	defaultValue,
	thisInput,
	onKeyPress,
	Editing,
	Save,
}) => (
	<Fragment>
		<input
			type="text"
			className="item__input"
			defaultValue={defaultValue}
			ref={thisInput}
			onKeyPress={onKeyPress}
		/>
		<button
			title="Cancelar edição"
			onClick={Editing}
			className="item__action item__action--red material-icons"
		>
			cancel
		</button>
		<button
			title="Salvar edição"
			onClick={Save}
			className="item__action item__action--green material-icons"
		>
			save
		</button>
	</Fragment>
);

export default ItemEditing;
