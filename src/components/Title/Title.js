import React from "react";

import { ButtonLink, ButtonAction } from "..";

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
			<ButtonLink title={titleBack} className="back material-icons" to={to}>
				navigate_before
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
