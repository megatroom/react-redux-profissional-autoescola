import React from "react";

import Student from "./Student";

const TheoryClassList = ({
  classes: theoryClasses,
  onEdit,
  onDelete,
  onMove
}) => (
  <div className="student-list">
    {theoryClasses.map((theoryClass, index) => (
      <Student
        key={theoryClass.id}
        student={theoryClass}
        index={index}
        total={theoryClasses.length}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
      />
    ))}
  </div>
);

export default TheoryClassList;
