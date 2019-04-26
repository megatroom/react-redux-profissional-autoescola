import React from "react";
import classNames from "classnames";

export default class Enrollment extends React.Component {
  render() {
    const { student, theoryClass, onEnroll, onUnenroll } = this.props;

    return (
      <div className="enrollment">
        <span className="enrollment__text">{student.name}</span>
        <span
          className={classNames("enrollment__text--done", {
            "enrollment__text--hidden": student.theoryClass == null
          })}
        >
          <i className="material-icons">done</i>
        </span>
        <button
          className={classNames("enrollment__button", {
            "enrollment__button--hidden": student.theoryClass != null
          })}
          onClick={onEnroll(student, theoryClass)}
        >
          <i className="material-icons">add</i>
        </button>
        <button
          className={classNames("enrollment__button", {
            "enrollment__button--hidden": student.theoryClass == null
          })}
          onClick={() => onUnenroll(student, theoryClass)}
        >
          <i className="material-icons">clear</i>
        </button>
      </div>
    );
  }
}
