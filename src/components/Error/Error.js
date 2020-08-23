import React from "react";

import "./error.scss";

const Error = ({ onRetryReload }) => (
	<div className="error">
		<h1>Ops!</h1>
		<p>Ocorreu um erro inesperado ao carregar os dados!</p>
		<button className="error__button" onClick={onRetryReload}>
			Tentar novamente
		</button>
	</div>
);

export default Error;
