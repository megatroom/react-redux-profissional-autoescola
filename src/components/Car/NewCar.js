import React, { Component } from 'react';

import ButtonIcon from '../Button/ButtonIcon';

import './car.scss';

export default class NewCar extends Component {
  state = {
    name: '',
    teacher: { id: '', name: '' }
  };

  handleSave(name, teacher) {
    this.props.onSave(name, teacher);
    this.setState({ name: '', teacher: { id: '', name: '' } });
  }

  render() {
    const { name, teacher } = this.state;
    const { teachers } = this.props;

    return (
      <div className='new-car'>
        <span className='new-car__span'>
          <input
            type='text'
            className='new-car__input'
            placeholder='Digite o nome do novo carro...'
            value={name}
            onChange={event => this.setState({ name: event.target.value })}
            onKeyPress={event => {
              if (event.key === 'Enter') this.handleSave(name, teacher);
            }}
          />

          <select
            className='new-car__select'
            value={teacher.id}
            onChange={event => {
              const options = event.target.options;
              const id = event.target.value;
              const name = Array.from(options).find(o => o.value === id).text;
              this.setState({ teacher: { id: id, name: name } });
            }}>
            <option value=''>Selecione o professor...</option>
            {teachers &&
              teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </select>
        </span>

        <ButtonIcon icon='save' onClick={() => this.handleSave(name, teacher)} />
      </div>
    );
  }
}
