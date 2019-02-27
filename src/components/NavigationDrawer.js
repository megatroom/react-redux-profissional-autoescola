import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

const NavigationDrawer = ({ isOpen, onCloseMenu, history }) => (
  <div
    className={classNames("navigation-drawer", {
      "navigation-drawer--open": isOpen
    })}
  >
    <div className="navigation-drawer__head">
      <button className="navigation-drawer__head__button" onClick={onCloseMenu}>
        <i className="material-icons">close</i>
      </button>
    </div>
    <div className="navigation-drawer__menu">
      <button
        className="navigation-drawer__menu__item"
        onClick={() => {
          onCloseMenu();
          history.push("/");
        }}
      >
        <i className="material-icons">home</i>
        <span>Home</span>
      </button>
      <button
        className="navigation-drawer__menu__item"
        onClick={() => {
          onCloseMenu();
          history.push("/aula-teorica");
        }}
      >
        <i className="material-icons">edit</i>
        <span>Aula Teórica</span>
      </button>
      <button
        className="navigation-drawer__menu__item"
        onClick={() => {
          onCloseMenu();
          history.push("/alunos");
        }}
      >
        <i className="material-icons">perm_identity</i>
        <span>Alunos</span>
      </button>
    </div>
  </div>
);

export default withRouter(NavigationDrawer);
