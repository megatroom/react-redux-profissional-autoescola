import React from "react";

import { Header, ButtonLink, Center } from "../../components";
import Travolta from "../../images/travolta.gif";

const PageNotFound = () => (
	<Center>
		<Header>Ops!!</Header>
		<div>
			<img src={Travolta} width="250px" />
		</div>
		<ButtonLink to="/">Voltar para página Inicial</ButtonLink>
	</Center>
);

export default PageNotFound;
