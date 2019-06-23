import React from 'react';

import withSettings from '../Settings/withSettings';
import withStudents from './withStudents';
import { NewStudent, StudentList, Error, FloatButton } from '../../components';

const StudentsPage = ({
  selectedTheme,
  students,
  isAdding,
  reloadHasError,
  saveHasError,
  onMove,
  onAdd,
  onSave,
  onEdit,
  onDelete,
  onRetry
}) => {
  if (reloadHasError) return <Error style={selectedTheme && selectedTheme.style} onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='students__container'>
        {isAdding ? (
          <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(false)} />
        ) : (
          <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(true)} />
        )}
        <h2>Alunos</h2>
      </div>
      {isAdding && <NewStudent saveHasError={saveHasError} onAdd={onAdd} onSave={onSave} />}
      <StudentList students={students} onMove={onMove} onEdit={onEdit} onDelete={onDelete} />
    </React.Fragment>
  );
};

export default withSettings(withStudents(StudentsPage));
