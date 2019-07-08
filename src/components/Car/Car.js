import React, { Component, Fragment } from 'react';

import ButtonIcon from '../Button/ButtonIcon';
import ListItem from '../List/ListItem';

import './car.scss';

class Car extends Component {
  state = {
    isEditing: false
  };

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    const teacher = this.select.value
      ? {
          id: this.select.value,
          name: Array.from(this.select.options).find(o => o.value === this.select.value).text
        }
      : null;

    this.props.onEdit(this.props.car.id, this.input.value, teacher);
    this.props.car.name = this.input.value;
    this.props.car.teacher = teacher;

    this.setState({ isEditing: false });
  };

  render() {
    const { car, index, total, teachers, onDelete, onMove } = this.props;
    const { isEditing } = this.state;

    return (
      <ListItem index={index} total={total} onMove={onMove}>
        <Fragment>
          {isEditing ? (
            <span className='car__span'>
              <input type='text' className='list-item__input' defaultValue={car.name} ref={current => (this.input = current)} />
              <select className='car__select' defaultValue={car.teacher ? car.teacher.id : ''} ref={current => (this.select = current)}>
                <option value=''>Selecione o professor...</option>
                {teachers &&
                  teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </span>
          ) : (
            <div className='list-item__text'>
              <span>{car.name}</span>
              <br />
              <span>{car.teacher ? car.teacher.name : 'Nenhum professor'}</span>
            </div>
          )}
          {isEditing && (
            <React.Fragment>
              <ButtonIcon icon='clear' classes='button__icon--cancel' onClick={this.handleCancel} />
              <ButtonIcon icon='done' classes='button__icon--success' onClick={this.handleSave} />
            </React.Fragment>
          )}

          <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
          <ButtonIcon icon='delete' disabled={isEditing} onClick={() => onDelete(car.id)} />
        </Fragment>
      </ListItem>
    );
  }
}

export default Car;
