import React from "react";

import EnrollmentList from "../components/EnrollmentList";
import Error from "../components/Error";

const Enrollments = ({
  students,
  theoryClass,
  reloadHasError,
  onEnroll,
  onUnenroll,
  onRetry
}) => {
  if (reloadHasError || theoryClass == null) return <Error onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className="students__container">
        <h2>{theoryClass.name}</h2>
      </div>
      <EnrollmentList
        students={students}
        theoryClass={theoryClass}
        onEnroll={onEnroll}
        onUnenroll={onUnenroll}
      />
    </React.Fragment>
  );
};

export default Enrollments;
