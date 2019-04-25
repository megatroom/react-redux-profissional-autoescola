import React from "react";

import NewTheoryClass from "../components/NewTheoryClass";
import TheoryClassList from "../components/TheoryClassList";
import Error from "../components/Error";

const TheoryClasses = ({
  theoryClasses,
  isAdding,
  reloadHasError,
  onAdd,
  onAdding,
  onEdit,
  onDelete,
  onMove,
  onCloseMenu,
  onRetry
}) => {
  if (reloadHasError) return <Error onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className="theory-classes__container">
        <div className="theory-classes__button__background">
          {isAdding ? (
            <button
              className="theory-classes__button theory-classes__button--floating"
              onClick={() => onAdding(false)}
            >
              <i className="material-icons">clear</i>
            </button>
          ) : (
            <button
              className="theory-classes__button theory-classes__button--floating"
              onClick={() => onAdding(true)}
            >
              <i className="material-icons">add</i>
            </button>
          )}
        </div>
        <h2>Aulas Teóricas</h2>
      </div>
      {isAdding && <NewTheoryClass onAdd={onAdd} />}
      <TheoryClassList
        theoryClasses={theoryClasses}
        onMove={onMove}
        onEdit={onEdit}
        onDelete={onDelete}
        onCloseMenu={onCloseMenu}
      />
    </React.Fragment>
  );
};

export default TheoryClasses;
