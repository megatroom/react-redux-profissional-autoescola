import React from "react";

import NewStudent from "../components/NewStudent";
import StudentList from "../components/StudentList";
import Error from "../components/Error";

const Students = ({
  students,
  isAdding,
  reloadHasError,
  onAdd,
  onAdding,
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
          {isAdding ? (
            <button
              className="students__button students__button--floating"
              onClick={() => onAdding(false)}
            >
              <i className="material-icons">clear</i>
            </button>
          ) : (
            <button
              className="students__button students__button--floating"
              onClick={() => onAdding(true)}
            >
              <i className="material-icons">add</i>
            </button>
          )}
        </div>
        <h2>Alunos</h2>
      </div>
      {isAdding && <NewStudent onAdd={onAdd} />}
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
