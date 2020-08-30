import React from "react";
import { withRouter } from "react-router-dom";

import StudentsList from "../Students/StudentsList";
import Title from "../Title/Title";

import withStudents from "../../containers/Students/withStudents";
import withTheoreticalClasses from "../../containers/TheoreticalClasses/withTheoreticalClasses";

const TheoreticalClassStudent = ({
	turma,
	students,
	onEditTheoreticalClasses,
	onEditStudents,
	history,
}) => {
	if (!turma.id) history.push("/theoretical_classes");
	return (
		<div>
			<Title
				title="Voltar para turmas"
				to="/theoretical_classes"
				text={turma.name}
			/>
			<StudentsList
				students={students}
				onEditStudents={onEditStudents}
				onEditTheoreticalClasses={onEditTheoreticalClasses}
				turma={turma}
			/>
		</div>
	);
};

export default withRouter(
	withTheoreticalClasses(withStudents(TheoreticalClassStudent))
);
