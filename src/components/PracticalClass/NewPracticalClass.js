import React, { Component } from 'react';

import ButtonIcon from '../Button/ButtonIcon';

import './practical-class.scss';

export default class NewPracticalClass extends Component {
  state = {
    name: ''
  };

  handleSave(practicalClass) {
    this.props.onSave(practicalClass);
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;

    return (
      <div className='new-practical-class'>
        <input
          type='text'
          className='new-practical-class__input'
          placeholder='Digite o nome da nova turma...'
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
          onKeyPress={event => {
            if (event.key === 'Enter') this.handleSave(event.target.value);
          }}
        />
        <ButtonIcon icon='save' onClick={() => this.handleSave(document.querySelector('.new-practical-class__input').value)} />
      </div>
    );
  }
}
