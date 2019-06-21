import React from 'react';

import withSettings from '../Settings/withSettings';
import { NewTheoryClass, TheoryClassList, Error, FloatButton } from '../../components';

const TheoryClassesPage = ({
  selectedTheme,
  theoryClasses,
  isAdding,
  reloadHasError,
  onAdd,
  onAdding,
  onEdit,
  onDelete,
  onMove,
  onManageEnrollment,
  onCloseMenu,
  onRetry
}) => {
  if (reloadHasError) return <Error style={selectedTheme && selectedTheme.style} onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='theory-classes__container'>
        <div className='theory-classes__button__background'>
          {isAdding ? (
            <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdding(false)} />
          ) : (
            <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdding(true)} />
          )}
        </div>
        <h2>Aulas Teóricas</h2>
      </div>
      {isAdding && <NewTheoryClass onAdd={onAdd} />}
      <TheoryClassList
        theoryClasses={theoryClasses}
        onMove={onMove}
        onEdit={onEdit}
        onDelete={onDelete}
        onManageEnrollment={onManageEnrollment}
        onCloseMenu={onCloseMenu}
      />
    </React.Fragment>
  );
};

export default withSettings(TheoryClassesPage);
