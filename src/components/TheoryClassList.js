import React from "react";

import TheoryClass from "./TheoryClass";

const TheoryClassList = ({
  theoryClasses,
  onEdit,
  onDelete,
  onMove,
  onManageEnrollment,
  onCloseMenu
}) => (
  <div className="theory-class-list">
    {theoryClasses.map((theoryClass, index) => (
      <TheoryClass
        key={theoryClass.id}
        theoryClass={theoryClass}
        index={index}
        total={theoryClasses.length}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        onManageEnrollment={onManageEnrollment}
        onCloseMenu={onCloseMenu}
      />
    ))}
  </div>
);

export default TheoryClassList;
