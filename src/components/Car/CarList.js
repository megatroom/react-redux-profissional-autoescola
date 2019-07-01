import React from 'react';

import Car from './Car';

import './car.scss';

const CarList = ({ cars, teachers, onEdit, onDelete, onMove, onAddTeacher }) => (
  <div className='car-list'>
    {cars.map((car, index) => (
      <Car
        key={car.id}
        car={car}
        index={index}
        total={cars.length}
        teachers={teachers}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        onAddTeacher={onAddTeacher}
      />
    ))}
  </div>
);

export default CarList;
