import React from "react"

import AddStudent from "./AddStudent"

const AddStudentList = ({ students, onDelete, onAdd, lessonStudents }) => (
    <div className="note-list">
        {students.map((student, index) => (
            <AddStudent 
                key={student.id} 
                student={student} 
                onAdd={onAdd}
                onDelete={onDelete} 
                lessonStudents={lessonStudents}
            />
        ))}
    </div>
);

export default AddStudentList