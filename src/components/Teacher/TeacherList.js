import React from 'react';

import Teacher from './Teacher';

import './teacher.scss';

const TeacherList = ({ teachers, onEdit, onDelete, onMove }) => (
  <div className='teacher-list'>
    {teachers.map((teacher, index) => (
      <Teacher
        key={teacher.id}
        teacher={teacher}
        index={index}
        total={teachers.length}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
      />
    ))}
  </div>
);

export default TeacherList;
