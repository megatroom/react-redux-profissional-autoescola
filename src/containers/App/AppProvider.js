import React, { Component } from "react";

import AppContext from "./AppContext";

export default class AppProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			saveHasError: false,
			reloadHasError: false,
		};
	}

	componentDidCatch() {
		this.handleReloadError(true);
	}

	//#region handle
	handleReloadError = (value) => {
		this.setState({ reloadHasError: value });
	};
	handleSaveError = (value) => {
		this.setState({ saveHasError: value });
	};
	handleLoading = (value) => {
		this.setState({ isLoading: value });
	};
	//#endregion handle

	render() {
		const { children } = this.props;
		const { isLoading, saveHasError, reloadHasError } = this.state;
		return (
			<AppContext.Provider
				value={{
					...this.state,
					isLoading: isLoading,
					saveHasError: saveHasError,
					reloadHasError: reloadHasError,
					handleReloadError: this.handleReloadError,
					handleSaveError: this.handleSaveError,
					handleLoading: this.handleLoading,
				}}
			>
				{children}
			</AppContext.Provider>
		);
	}
}
