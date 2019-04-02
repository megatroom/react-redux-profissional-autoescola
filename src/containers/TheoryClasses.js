import React from "react";

import NewStudent from "../components/NewStudent";
import StudentList from "../components/StudentList";
import Error from "../components/Error";

const TheoryClasses = ({
  classes,
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
      <div className="classes__container">
        <div className="classes__button__background">
          {isAdding ? (
            <button
              className="classes__button classes__button--floating"
              onClick={() => onAdding(false)}
            >
              <i className="material-icons">clear</i>
            </button>
          ) : (
            <button
              className="classes__button classes__button--floating"
              onClick={() => onAdding(true)}
            >
              <i className="material-icons">add</i>
            </button>
          )}
        </div>
        <h2>Alunos</h2>
      </div>
      {isAdding && <NewTheoryClass onAdd={onAdd} />}
      <TheoryClassList
        classes={classes}
        onMove={onMove}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </React.Fragment>
  );
};

export default TheoryClasses;
