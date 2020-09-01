import React from "react";

import Center from "../Center/Center";
import Header from "../Header/Header";
import Button from "../Button/Button";

const Error = ({ onRetryReload }) => (
	<Center>
		<Header>Ops!</Header>
		<p>Ocorreu um erro inesperado ao carregar os dados!</p>
		<Button onClick={onRetryReload}>Tentar novamente</Button>
	</Center>
);

export default Error;
