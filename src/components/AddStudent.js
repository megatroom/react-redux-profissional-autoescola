import React from 'react'

class AddStudent extends React.Component {

    
    
    render() {
        const {student, lessonStudents, onAdd, onDelete} = this.props;
        return (
            
            <div className="add-student">
            <span className="add-student__text">{student.text}</span>
            {
                lessonStudents.findIndex(s => s === student.id) === -1 
                ? 
                (<button className="add-student__button" onClick={() => {
                    onAdd(student.id)
                }}><i className="material-icons">check_box_outline_blank</i></button>) 
                :
                (<button className="add-student__button" onClick={() => {
                    onDelete(student.id)
                }}><i className="material-icons">check_box</i></button>)
            }
            </div>
            
        );
    }
}

export default AddStudent