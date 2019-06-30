import React, { Fragment } from 'react';

import withSettings from '../Settings/withSettings';
import withTeachers from './withTeachers';
import { NewTeacher, TeacherList, Error, FloatButton, Header } from '../../components';

const TeachersPage = ({
  selectedTheme,
  teachers,
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
    <Fragment>
      <div className='teacher__container'>
        {!saveHasError &&
          (isAdding ? (
            <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(false)} />
          ) : (
            <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(true)} />
          ))}
        <Header>Professores</Header>
      </div>
      {!saveHasError && isAdding && <NewTeacher onAdd={onAdd} onSave={onSave} />}
      <TeacherList teachers={teachers} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
    </Fragment>
  );
};

export default withSettings(withTeachers(TeachersPage));
