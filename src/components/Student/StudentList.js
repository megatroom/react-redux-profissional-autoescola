import React from 'react';

import Student from './Student';

import './student.scss';

const StudentList = ({ students, onEdit, onDelete, onMove }) => (
  <div className='student-list'>
    {students.map((student, index) => (
      <Student
        key={student.id}
        student={student}
        index={index}
        total={students.length}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
      />
    ))}
  </div>
);

export default StudentList;
