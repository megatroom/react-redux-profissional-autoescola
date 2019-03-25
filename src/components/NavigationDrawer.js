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
        <i className="material-icons">note</i> Notas
      </button>
      <button
        className="navigation-drawer__menu__item"
        onClick={() => {
          onCloseMenu();
          history.push("/about");
        }}
      >
        <i className="material-icons">info</i> Sobre
      </button>
    </div>
  </div>
);

export default withRouter(NavigationDrawer);
