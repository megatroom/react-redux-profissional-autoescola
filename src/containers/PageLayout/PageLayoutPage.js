import React, { Component } from "react";

import { AppBar, Container } from "../../components";
import withApp from "../App/withApp";

class PageLayoutPage extends Component {
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
			handleSaveStudents,
			handleSaveTheoricClasses,
		} = this.props;
		const { isOpenMenu } = this.state;
		return (
			<div>
				<AppBar
					isLoading={isLoading}
					saveHasError={saveHasError}
					handleSaveStudents={handleSaveStudents}
					handleSaveTheoricClasses={handleSaveTheoricClasses}
				/>
				<Container>{children}</Container>
			</div>
		);
	}
}

export default withApp(PageLayoutPage);
