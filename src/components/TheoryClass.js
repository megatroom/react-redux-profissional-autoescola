import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

class TheoryClass extends React.Component {
  state = {
    isEditing: false
  };

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    this.props.onEdit(this.props.theoryClass.id, this.input.value);
    this.setState({ isEditing: false });
  };

  render() {
    const {
      theoryClass,
      index,
      total,
      history,
      onDelete,
      onMove,
      onCloseMenu
    } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="theory-class">
        {isEditing ? (
          <input
            type="text"
            className="theory-class__input"
            defaultValue={theoryClass.name}
            ref={current => (this.input = current)}
          />
        ) : (
          <span className="theory-class__text">{theoryClass.name}</span>
        )}
        {isEditing && (
          <React.Fragment>
            <button
              className="theory-class__button theory-class__button--cancel"
              onClick={this.handleCancel}
            >
              <i className="material-icons">clear</i>
            </button>
            <button
              className="theory-class__button theory-class__button--success"
              onClick={this.handleSave}
            >
              <i className="material-icons">done</i>
            </button>
          </React.Fragment>
        )}
        <button
          className="theory-class__button"
          disabled={isEditing}
          onClick={() => {
            onCloseMenu();
            history.push("/enrollments");
          }}
        >
          <i className="material-icons">group</i>
        </button>
        <button
          className="theory-class__button"
          disabled={isEditing}
          onClick={this.handleEdit}
        >
          <i className="material-icons">edit</i>
        </button>
        <button
          className="theory-class__button"
          disabled={isEditing}
          onClick={() => onDelete(theoryClass.id)}
        >
          <i className="material-icons">delete</i>
        </button>
        <div
          className={classNames("theory-class__arrows", {
            "theory-class__arrows--hidden": total === 1
          })}
        >
          <button
            className={classNames(
              "theory-class__button",
              "theory-class__button--arrow",
              {
                "theory-class__button--hidden": index === 0
              }
            )}
            onClick={() => {
              onMove("up", index);
            }}
          >
            <i className="material-icons">keyboard_arrow_up</i>
          </button>
          <button
            className={classNames(
              "theory-class__button",
              "theory-class__button--arrow",
              {
                "theory-class__button--hidden": index === total - 1
              }
            )}
            onClick={() => {
              onMove("down", index);
            }}
          >
            <i className="material-icons">keyboard_arrow_down</i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(TheoryClass);
