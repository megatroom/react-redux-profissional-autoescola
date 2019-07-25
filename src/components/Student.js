import React from "react"
import classNames from "classnames"


class Student extends React.Component {

    state = {
        isEditing: false
    }

    handleEdit = () => {
        this.setState({
            isEditing: true
        });
    }

    handleCancel = () => {
        this.setState({ isEditing: false });
    }

    handleSave = () => {
        this.props.onEdit(this.props.student.id, this.input.value);
        this.setState({ isEditing: false });
    }

    render() {

        const { student, onDelete} = this.props;
        const { isEditing } = this.state;
        return (<div className="note">
            {isEditing ? (
                <input type="text" className="note__input" defaultValue={student.text} ref={c => { this.input = c; }} />
            ) : (
                    <span className="note__text">{student.text}</span>
                )}

            {isEditing && (
                <React.Fragment>
                    <button
                        className="note__button note__button--red"
                        onClick={this.handleCancel}
                    >
                        <i className="material-icons">cancel</i>
                    </button>
                    <button
                        className="note__button note__button--green"
                        onClick={this.handleSave}
                    >
                        <i className="material-icons">done_outline</i>
                    </button>
                </React.Fragment>)
            }

            <button
                disabled={isEditing}
                className={classNames("note__button")}
                onClick={this.handleEdit}
            >
                <i className="material-icons">edit</i>
            </button>

            <button
                disabled={isEditing} className={classNames("note__button")}
                onClick={() => {
                    onDelete(student.id);
                }}
            >
                <i className="material-icons">delete</i>
            </button>
        </div>
        )
    }
}

export default Student