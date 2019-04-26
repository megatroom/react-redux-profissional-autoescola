import React from "react";

import Enrollment from "./Enrollment";

const EnrollmentList = ({ students, onEnroll, onUnenroll }) => (
  <div className="student-list">
    {students.map((student, index) => (
      <Enrollment
        key={student.id}
        student={student}
        index={index}
        onEnroll={onEnroll}
        onUnenroll={onUnenroll}
      />
    ))}
  </div>
);

export default EnrollmentList;
