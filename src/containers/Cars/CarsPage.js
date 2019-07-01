import React from 'react';

import withSettings from '../Settings/withSettings';
import { NewCar, CarList, Error, FloatButton, Header } from '../../components';
import withCars from './withCars';

const CarsPage = ({
  selectedTheme,
  cars,
  teachers,
  isAdding,
  reloadHasError,
  saveHasError,
  onAdd,
  onSave,
  onEdit,
  onDelete,
  onMove,
  onAddTeacher,
  onRetry
}) => {
  if (reloadHasError) return <Error style={selectedTheme && selectedTheme.style} onRetry={onRetry} />;

  return (
    <React.Fragment>
      <div className='cars__container'>
        <div className='cars__button__background'>
          {!saveHasError &&
            (isAdding ? (
              <FloatButton icon='clear' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(false)} />
            ) : (
              <FloatButton icon='add' style={selectedTheme && selectedTheme.style} onClick={() => onAdd(true)} />
            ))}
        </div>
        <Header>Carros</Header>
      </div>
      {!saveHasError && isAdding && <NewCar teachers={teachers} onAdd={onAdd} onSave={onSave} />}
      <CarList
        cars={cars}
        teachers={teachers}
        saveHasError={saveHasError}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        onAddTeacher={onAddTeacher}
      />
    </React.Fragment>
  );
};

export default withSettings(withCars(CarsPage));
