import React from "react"
import classNames from "classnames"


class TheoryLesson extends React.Component {

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
        this.props.onEdit(this.props.theoryLesson.id, this.input.value);
        this.setState({ isEditing: false });
    }

    render() {

        const { theoryLesson, onDelete} = this.props;
        const { isEditing } = this.state;
        return (<div className="theory-lesson">
            {isEditing ? (
                <input type="text" className="theory-lesson__input" defaultValue={theoryLesson.text} ref={c => { this.input = c; }} />
            ) : (
                    <span className="theory-lesson__text">{theoryLesson.text}</span>
                )}

            {isEditing && (
                <React.Fragment>
                    <button
                        className="theory-lesson__button theory-lesson__button--red"
                        onClick={this.handleCancel}
                    >
                        <i className="material-icons">cancel</i>
                    </button>
                    <button
                        className="theory-lesson__button theory-lesson__button--green"
                        onClick={this.handleSave}
                    >
                        <i className="material-icons">done_outline</i>
                    </button>
                </React.Fragment>)
            }

            <button className="theory-lesson__button theory-lesson__button--text"><span className="theory-lesson__student-count">{`${theoryLesson.students.length === 1 ? theoryLesson.students.length + ' aluno' :  theoryLesson.students.length + ' alunos' }`}</span></button>


            <button
                disabled={isEditing}
                className={classNames("theory-lesson__button")}
                onClick={this.handleEdit}
            >
                <i className="material-icons">edit</i>
            </button>

            <button
                disabled={isEditing} className={classNames("theory-lesson__button")}
                onClick={() => {
                    onDelete(theoryLesson.id);
                }}
            >
                <i className="material-icons">delete</i>
            </button>
        </div>
        )
    }
}

export default TheoryLesson