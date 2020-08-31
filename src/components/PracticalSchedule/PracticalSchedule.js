import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Title from "../Title/Title";
import PracticalScheduleList from "./PracticalScheduleList";

import withStudents from "../../containers/Students/withStudents";
import withPracticalClasses from "../../containers/PracticalClasses/withPracticalClasses";

class PracticalSchedule extends Component {
	state = { car: null };

	selectedCar = (idCar) => {
		this.setState({ car: idCar });
	};

	render() {
		const {
			// schedule,
			students,
			onEditPracticalClasses,
			history,
		} = this.props;
		const schedule = {
			description: "09:00",
			id: "3f884a60-eba1-11ea-b152-ad1fc03b435c",
		};
		if (!schedule.id) history.push("/practical_classes");

		return (
			<div>
				<Title
					title="Voltar para horários"
					to="/practical_classes"
					text={schedule.name}
				/>
				<PracticalScheduleList
					students={students}
					onEditPracticalClasses={onEditPracticalClasses}
					selectedCar={this.selectedCar}
				/>
			</div>
		);
	}
}

export default withRouter(
	withPracticalClasses(withStudents(PracticalSchedule))
);
