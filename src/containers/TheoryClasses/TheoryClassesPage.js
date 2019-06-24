import React from 'react';

import withTheoryClasses from './withTheoryClasses';
import withSettings from '../Settings/withSettings';
import withEnrollments from '../Enrollments/withEnrollments';
import { NewTheoryClass, TheoryClassList, Error, FloatButton } from '../../components';

const TheoryClassesPage = ({
  selectedTheme,
  theoryClasses,
  isAdding,
  reloadHasError,
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
      <div className='theory-classes__container'>
        <div className='theory-classes__button__background'>
          {isAdding ? (
            <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(false)} />
          ) : (
            <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(true)} />
          )}
        </div>
        <h2>Aulas Teóricas</h2>
      </div>
      {isAdding && <NewTheoryClass onAdd={onAdd} onSave={onSave} />}
      <TheoryClassList
        theoryClasses={theoryClasses}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        onManageEnrollment={onManageEnrollment}
      />
    </React.Fragment>
  );
};

export default withSettings(withEnrollments(withTheoryClasses(TheoryClassesPage)));
