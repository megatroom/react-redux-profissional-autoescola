import React from 'react';

import withSettings from '../Settings/withSettings';
import withStudents from './withStudents';
import { NewStudent, StudentList, Error, FloatButton, Header } from '../../components';

const StudentsPage = ({
  selectedTheme,
  students,
  isAdding,
  reloadHasError,
  saveHasError,
  onAdd,
  onSave,
  onEdit,
  onDelete,
  onMove,
  onRetry
}) => {
  if (reloadHasError) return <Error style={selectedTheme && selectedTheme.style} onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='students__container'>
        {!saveHasError &&
          (isAdding ? (
            <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(false)} />
          ) : (
            <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(true)} />
          ))}
        <Header>Alunos</Header>
      </div>
      {!saveHasError && isAdding && <NewStudent onAdd={onAdd} onSave={onSave} />}
      <StudentList students={students} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
    </React.Fragment>
  );
};

export default withSettings(withStudents(StudentsPage));
