import React from "react";

import MainOption from "./MainOption";

import { main } from "../Routes";

import "./main.scss";

const MainPage = () => (
	<div className="main">
		{main.map((elem) => {
			return Object.keys(elem).map((category) => (
				<div key={elem[category]} className="main__options">
					<span>{category}</span>
					<hr />
					{elem[category].map(({ title, desc, path, icon }) => (
						<MainOption
							key={desc}
							title={title}
							path={path}
							icon={icon}
							desc={desc}
						/>
					))}
				</div>
			));
		})}
	</div>
);

export default MainPage;
