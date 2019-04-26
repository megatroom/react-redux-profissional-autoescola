import React from "react";

import EnrollmentList from "../components/EnrollmentList";
import Error from "../components/Error";

const Enrollments = ({
  students,
  reloadHasError,
  onEnroll,
  onUnenroll,
  onRetry
}) => {
  if (reloadHasError) return <Error onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className="students__container">
        <h2>Descrição da Aula Teórica</h2>
      </div>
      <EnrollmentList
        students={students}
        onEnroll={onEnroll}
        onUnenroll={onUnenroll}
      />
    </React.Fragment>
  );
};

export default Enrollments;
