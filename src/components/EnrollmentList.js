import React from "react";

import Enrollment from "./Enrollment";

const EnrollmentList = ({ students, theoryClass, onEnroll, onUnenroll }) => (
  <div className="enrollment-list">
    {students.map(
      student =>
        (student.theoryClass == null ||
          student.theoryClass.id == theoryClass.id) && (
          <Enrollment
            key={student.id}
            student={student}
            theoryClass={theoryClass}
            onEnroll={onEnroll}
            onUnenroll={onUnenroll}
          />
        )
    )}
  </div>
);

export default EnrollmentList;
