import React from 'react';

import ButtonIcon from '../Button/ButtonIcon';

import './student.scss';

export default class NewStudent extends React.Component {
  state = {
    name: ''
  };

  handleSave(student) {
    this.props.onSave(student);
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
            if (event.key === 'Enter') this.handleSave(event.target.value);
          }}
        />
        <ButtonIcon icon='save' onClick={() => this.handleSave(document.querySelector('.new-student__input').value)} />
      </div>
    );
  }
}
