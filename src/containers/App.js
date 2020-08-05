import React, { Component } from "react";
import Main from "./Main";
import AppBar from "../components/AppBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Alunos from "./Alunos";

export default class App extends Component {
	constructor(propos) {
		super(propos);
		this.state = {};
	}
	render() {
		return (
			<Router>
				<div>
					<AppBar />
					<div className="container">
						<Route path="/" exact render={(props) => <Main />} />
						<Route path="/alunos" render={(props) => <Alunos />} />
					</div>
				</div>
			</Router>
		);
	}
}
