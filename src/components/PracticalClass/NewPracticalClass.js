import React, { Component } from 'react';

import ButtonIcon from '../Button/ButtonIcon';

import './practical-class.scss';

export default class NewPracticalClass extends Component {
  state = {
    student: { id: '', name: '' },
    car: { id: '', name: '' },
    date: '',
    hour: ''
  };

  handleSave() {
    const { student, car, date, hour } = this.state;
    this.props.onSave(student, car, date, hour);
    this.setState({ student: { id: '', name: '' }, car: { id: '', name: '' }, date: '', hour: '' });
  }

  render() {
    const { student, car, date, hour } = this.state;
    const { students, cars } = this.props;

    return (
      <div className='new-practical-class'>
        <span className='new-car__span'>
          <select
            className='new-practical-class__select'
            value={student.id}
            onChange={event => {
              const options = event.target.options;
              const id = event.target.value;
              const name = Array.from(options).find(o => o.value === id).text;
              this.setState({ student: { id: id, name: name } });
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
            value={car.id}
            onChange={event => {
              const options = event.target.options;
              const id = event.target.value;
              const name = Array.from(options).find(o => o.value === id).text;
              this.setState({ car: { id: id, name: name } });
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
            value={date}
            onChange={event => this.setState({ date: event.target.value })}
            onKeyPress={event => {
              if (event.key === 'Enter') this.handleSave();
            }}
          />

          <input
            type='time'
            className='new-practical-class__input'
            value={hour}
            step='3600'
            onChange={event => this.setState({ hour: event.target.value })}
            onKeyPress={event => {
              if (event.key === 'Enter') this.handleSave();
            }}
          />
        </span>

        <ButtonIcon icon='save' onClick={() => this.handleSave()} />
      </div>
    );
  }
}
