import React from 'react';

import ButtonIcon from '../Button/ButtonIcon';

import './student.scss';

export default class NewStudent extends React.Component {
  state = {
    name: ''
  };

  handleAdd(student) {
    this.props.onAdd(student);
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;

    return (
      <div className='new-student'>
        <input
          type='text'
          className='new-student__input'
          placeholder='Digite o nome do novo aluno...'
          value={name}
          onChange={event => this.setState({ name: event.target.value })}
          onKeyPress={event => {
            if (event.key === 'Enter') this.handleAdd(event.target.value);
          }}
        />
        <ButtonIcon icon='save' onClick={() => this.handleAdd(document.querySelector('.new-student__input').value)} />
      </div>
    );
  }
}
