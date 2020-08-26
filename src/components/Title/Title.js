import React from "react";
import { ButtonLink } from "..";

import ButtonAction from "../Button/ButtonAction";

import "./title.scss";

const Title = ({
	titleBack,
	titleAction,
	to,
	text,
	saveHasError,
	handleSave,
}) => (
	<div>
		<div className="brand">
			<ButtonLink title={titleBack} typeClass="back material-icons" to={to}>
				chevron_left
			</ButtonLink>
			<span>{text}</span>
			{saveHasError && (
				<ButtonAction
					title={`Erro ao salvar dados!\n${titleAction}..`}
					type="danger"
					onClick={() => {
						handleSave();
					}}
					icon="cloud_off"
				/>
			)}
		</div>
		<hr />
	</div>
);

export default Title;
