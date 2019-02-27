import React from "react";

const AppBar = ({
  onOpenMenu,
  isLoading,
  saveAlunosHasError,
  saveTurmasHasError,
  onRetrySaveAlunos,
  onRetrySaveTurmas
}) => (
  <div className="app-bar">
    <div className="app-bar__container">
      <button className="app-bar__action" onClick={onOpenMenu}>
        <i className="material-icons">menu</i>
      </button>
      <span className="app-bar__brand">Auto Escola</span>
      {isLoading && (
        <span className="app-bar__action app-bar__action--rotation">
          <i className="material-icons">refresh</i>
        </span>
      )}
      {saveAlunosHasError && (
        <button
          className="app-bar__action"
          style={{ color: "red" }}
          onClick={onRetrySaveAlunos}
        >
          <i className="material-icons">cloud_off</i>
        </button>
      )}
      {saveTurmasHasError && (
        <button
          className="app-bar__action"
          style={{ color: "red" }}
          onClick={onRetrySaveTurmas}
        >
          <i className="material-icons">cloud_off</i>
        </button>
      )}
    </div>
  </div>
);

export default AppBar;
