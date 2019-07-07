import React from 'react';

import withSettings from '../Settings/withSettings';
import withEnrollments from '../Enrollments/withEnrollments';
import withPracticalClasses from './withPracticalClasses';
import { NewPracticalClass, PracticalClassList, Error, FloatButton, Header } from '../../components';

const PracticalClassesPage = ({
  selectedTheme,
  practicalClasses,
  cars,
  students,
  isAdding,
  reloadHasError,
  saveHasError,
  onAdd,
  onSave,
  onEdit,
  onDelete,
  onMove,
  onManageEnrollment,
  onRetry
}) => {
  if (reloadHasError) return <Error style={selectedTheme && selectedTheme.style} onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='practical-classes__container'>
        <div className='practical-classes__button__background'>
          {!saveHasError &&
            (isAdding ? (
              <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(false)} />
            ) : (
              <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(true)} />
            ))}
        </div>
        <Header>Aulas Práticas</Header>
      </div>
      {!saveHasError && isAdding && <NewPracticalClass students={students} cars={cars} onAdd={onAdd} onSave={onSave} />}
      <PracticalClassList
        practicalClasses={practicalClasses}
        students={students}
        cars={cars}
        saveHasError={saveHasError}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        onManageEnrollment={onManageEnrollment}
      />
    </React.Fragment>
  );
};

export default withSettings(withEnrollments(withPracticalClasses(PracticalClassesPage)));
