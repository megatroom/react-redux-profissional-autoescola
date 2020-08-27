import React from "react";
import { withRouter } from "react-router-dom";

import StudentsList from "../StudentsList/StudentsList";
import Title from "../Title/Title";

import withStudents from "../../containers/Students/withStudents";
import withTheoricClasses from "../../containers/TheoricClasses/withTheoricClasses";

const TheoricClassStudent = ({
	turma,
	students,
	onEditTheoricClasses,
	onEditStudents,
	history,
}) => {
	if (!turma.id) history.push("/theoric_classes");
	return (
		<div>
			<Title
				title="Voltar para turmas"
				to="/theoric_classes"
				text={turma.nome}
			/>
			<StudentsList
				students={students}
				onEditStudents={onEditStudents}
				onEditTheoricClasses={onEditTheoricClasses}
				turma={turma}
			/>
		</div>
	);
};

export default withRouter(
	withTheoricClasses(withStudents(TheoricClassStudent))
);
