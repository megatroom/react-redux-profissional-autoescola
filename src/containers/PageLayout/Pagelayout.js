import React, { Component } from "react";

import { AppBar, Container } from "../../components";
import withApp from "../App/withApp";

class PageLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenMenu: false,
		};
	}

	handleMenu = (value) => {
		this.setState({ isOpenMenu: value });
	};

	render() {
		const {
			children,
			isLoading,
			saveHasError,
			handleSaveAlunos,
			handleSaveClasses,
		} = this.props;
		const { isOpenMenu } = this.state;
		return (
			<div>
				<AppBar
					isLoading={isLoading}
					saveHasError={saveHasError}
					handleSaveAlunos={handleSaveAlunos}
					handleSaveClasses={handleSaveClasses}
				/>
				<Container>{children}</Container>
			</div>
		);
	}
}

export default withApp(PageLayout);
