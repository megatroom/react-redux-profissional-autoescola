import React from 'react';

import TheoryClass from './TheoryClass';

import './theory-class.scss';

const TheoryClassList = ({ theoryClasses, saveHasError, onEdit, onDelete, onMove, onManageEnrollment }) => (
  <div className='theory-class-list'>
    {theoryClasses.map((theoryClass, index) => (
      <TheoryClass
        key={theoryClass.id}
        theoryClass={theoryClass}
        index={index}
        total={theoryClasses.length}
        saveHasError={saveHasError}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        onManageEnrollment={onManageEnrollment}
      />
    ))}
  </div>
);

export default TheoryClassList;
