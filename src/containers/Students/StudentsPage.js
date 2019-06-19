import React from 'react';

import { NewStudent, StudentList, Error, FloatButton } from '../../components';

const StudentsPage = ({ students, isAdding, reloadHasError, onAdd, onAdding, onEdit, onDelete, onMove, onRetry }) => {
  if (reloadHasError) return <Error onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='students__container'>
        {isAdding ? (
          <FloatButton icon='clear' onClick={() => onAdding(false)} />
        ) : (
          <FloatButton icon='add' onClick={() => onAdding(true)} />
        )}
        <h2>Alunos</h2>
      </div>
      {isAdding && <NewStudent onAdd={onAdd} />}
      <StudentList students={students} onMove={onMove} onEdit={onEdit} onDelete={onDelete} />
    </React.Fragment>
  );
};

export default StudentsPage;
