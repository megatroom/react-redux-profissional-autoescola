import React from "react";

import Enrollment from "./Enrollment";

const EnrollmentList = ({ students, theoryClass, onEnroll, onUnenroll }) => (
  <div className="enrollment-list">
    {students.map(student => (
      <Enrollment
        key={student.id}
        student={student}
        theoryClass={theoryClass}
        onEnroll={onEnroll}
        onUnenroll={onUnenroll}
      />
    ))}
  </div>
);

export default EnrollmentList;
