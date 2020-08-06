import React from "react";

const Error = ({ onRetryReload }) => (
	<div className="error">
		<h1>Ops!</h1>
		<p>Ocorreu um erro inesperado ao carregar a lista de alunos!</p>
		<button className="error__button" onClick={onRetryReload}>
			Tentar novamente
		</button>
	</div>
);

export default Error;
