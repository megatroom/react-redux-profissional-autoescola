import React from "react";

const AppBar = ({
	isLoading,
	saveHasError,
	handleSaveAlunos,
	handleSaveClasses,
	p,
}) => (
	<div className="appbar">
		<div className="appbar__container">
			<button className="appbar__action material-icons">menu</button>
			<span className="appbar__brand">Auto Escola Senna</span>
			{isLoading && (
				<button className="appbar__action material-icons appbar__action--rotation">
					refresh
				</button>
			)}
			{saveHasError && (
				<button
					onClick={() => {
						handleSaveAlunos();
					}}
					className="appbar__action material-icons appbar__action--danger"
				>
					cloud_off
				</button>
			)}
		</div>
	</div>
);

export default AppBar;
