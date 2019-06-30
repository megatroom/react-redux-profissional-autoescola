import React, { Component } from 'react';

import ButtonIcon from '../Button/ButtonIcon';

import './teacher.scss';

export default class NewTeacher extends Component {
  state = {
    name: ''
  };

  handleSave(teacher) {
    this.props.onSave(teacher);
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;

    return (
      <div className='new-teacher'>
        <input
          type='text'
          className='new-teacher__input'
          placeholder='Digite o nome do novo professor...'
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
          onKeyPress={event => {
            if (event.key === 'Enter') this.handleSave(event.target.value);
          }}
        />
        <ButtonIcon icon='save' onClick={() => this.handleSave(document.querySelector('.new-teacher__input').value)} />
      </div>
    );
  }
}
