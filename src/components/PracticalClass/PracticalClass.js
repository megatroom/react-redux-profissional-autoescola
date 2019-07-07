import React, { Component, Fragment } from 'react';

import ButtonIcon from '../Button/ButtonIcon';
import ListItem from '../List/ListItem';

import './practical-class.scss';

class PracticalClass extends Component {
  state = {
    isEditing: false
  };

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    const { id, student, car, date, hour } = this.props.practicalClass;
    this.props.onEdit(id, student, car, date, hour);
    this.setState({ isEditing: false });
  };

  render() {
    const { practicalClass, students, cars, index, total, onDelete, onMove } = this.props;
    const { isEditing } = this.state;

    return (
      <ListItem index={index} total={total} onMove={onMove}>
        <Fragment>
          {isEditing ? (
            <span className='new-car__span'>
              <select
                className='new-practical-class__select'
                value={practicalClass.student.id}
                onChange={event => {
                  const selected = Array.from(event.target.options).find(o => o.value === event.target.value);
                  practicalClass.student.id = selected.value;
                  practicalClass.student.name = selected.text;
                }}>
                <option value=''>Selecione o aluno...</option>
                {students &&
                  students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>

              <select
                className='new-practical-class__select'
                value={practicalClass.car.id}
                onChange={event => {
                  const selected = Array.from(event.target.options).find(o => o.value === event.target.value);
                  practicalClass.car.id = selected.value;
                  practicalClass.car.name = selected.text;
                }}>
                <option value=''>Selecione o carro...</option>
                {cars &&
                  cars.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>

              <input
                type='date'
                className='new-practical-class__input'
                value={practicalClass.date}
                onChange={event => (practicalClass.date = event.target.value)}
                onKeyPress={event => {
                  if (event.key === 'Enter') this.handleSave();
                }}
              />

              <input
                type='time'
                className='new-practical-class__input'
                value={practicalClass.hour}
                step='3600'
                onChange={event => (practicalClass.hour = event.target.value)}
                onKeyPress={event => {
                  if (event.key === 'Enter') this.handleSave();
                }}
              />
            </span>
          ) : (
            <div className='list-item__text'>
              <span>{practicalClass.student.name}</span>
              <br />
              <span>{practicalClass.car.name}</span>
              <br />
              <span>{practicalClass.date}</span>
              <br />
              <span>{practicalClass.hour}</span>
            </div>
          )}
          {isEditing && (
            <React.Fragment>
              <ButtonIcon icon='clear' classes='button__icon--cancel' onClick={this.handleCancel} />
              <ButtonIcon icon='done' classes='button__icon--success' onClick={this.handleSave} />
            </React.Fragment>
          )}

          <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
          <ButtonIcon icon='delete' disabled={isEditing} onClick={() => onDelete(practicalClass.id)} />
        </Fragment>
      </ListItem>
    );
  }
}

export default PracticalClass;
