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
    const { students, cars } = this.props;

    this.props.practicalClass.student = students.find(s => s.id === this.studentSelect.value);
    this.props.practicalClass.car = cars.find(c => c.id === this.carSelect.value);
    this.props.practicalClass.date = this.dateInput.value;
    this.props.practicalClass.hour = this.hourInput.value;

    this.props.onEdit(this.props.practicalClass);
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
                defaultValue={practicalClass.student.id}
                ref={current => (this.studentSelect = current)}>
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
                defaultValue={practicalClass.car.id}
                ref={current => (this.carSelect = current)}>
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
                defaultValue={practicalClass.date}
                ref={current => (this.dateInput = current)}
                onKeyPress={event => {
                  if (event.key === 'Enter') this.handleSave();
                }}
              />

              <input
                type='time'
                className='new-practical-class__input'
                defaultValue={practicalClass.hour}
                step='3600'
                ref={current => (this.hourInput = current)}
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
