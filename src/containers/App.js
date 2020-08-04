import React, { Component } from "react";
import Main from "./Main";
import AppBar from "../components/AppBar";

export default class App extends Component {
	constructor(propos) {
		super(propos);
		this.state = {};
	}
	render() {
		return (
			<div>
				<AppBar />
				<div className="container">
					<Main />
				</div>
			</div>
		);
	}
}
