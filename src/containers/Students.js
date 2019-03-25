import React from "react";

import NewStudent from "../components/NewStudent";
import StudentList from "../components/StudentList";
import Error from "../components/Error";

const Students = ({
  students,
  reloadHasError,
  onAdd,
  onEdit,
  onDelete,
  onMove,
  onRetry
}) => {
  if (reloadHasError) return <Error onRetry={onRetry} />;

  return (
    <React.Fragment>
      <NewStudent onAdd={onAdd} />
      <StudentList
        students={students}
        onMove={onMove}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </React.Fragment>
  );
};

export default Students;
