import React from "react";
import classNames from "classnames";

export default class Enrollment extends React.Component {
  render() {
    const { student, onEnroll, onUnenroll } = this.props;

    return (
      <div className="enrollment">
        <span className="enrollment__text">{student.name}</span>
        <span
          className={classNames("enrollment__text", {
            "enrollment__text--hidden": true
          })}
        >
          <i className="material-icons">done</i>
        </span>
        <button
          className={classNames("enrollment__button", {
            "enrollment__button--hidden": true
          })}
          onClick={onEnroll}
        >
          <i className="material-icons">add</i>
        </button>
        <button
          className={classNames("enrollment__button", {
            "enrollment__button--hidden": false
          })}
          onClick={() => onUnenroll(student.id)}
        >
          <i className="material-icons">clear</i>
        </button>
      </div>
    );
  }
}
