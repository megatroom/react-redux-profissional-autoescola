import React from "react";

import NewStudent from "../components/NewStudent";
import StudentList from "../components/StudentList";
import Error from "../components/Error";

const Students = ({
  students,
  isAdding,
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
      <div className="students__container">
        <div className="students__button__background">
          <button className="students__button students__button--floating">
            <i className="material-icons">add</i>
          </button>
        </div>
        <h2>Alunos</h2>
      </div>
      <NewStudent onAdd={onAdd} isAdding={isAdding} />
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
