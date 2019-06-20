import React from 'react';
import classNames from 'classnames';

import ButtonIcon from '../Button/ButtonIcon';

import './student.scss';

export default class Student extends React.Component {
  state = {
    isEditing: false
  };

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    this.props.onEdit(this.props.student.id, this.input.value);
    this.setState({ isEditing: false });
  };

  render() {
    const { student, index, total, onDelete, onMove } = this.props;
    const { isEditing } = this.state;

    return (
      <div className='student'>
        {isEditing ? (
          <input type='text' className='student__input' defaultValue={student.name} ref={current => (this.input = current)} />
        ) : (
          <span className='student__text'>{student.name}</span>
        )}
        {isEditing && (
          <React.Fragment>
            <ButtonIcon icon='clear' classes='button__icon--cancel' onClick={this.handleCancel} />
            <ButtonIcon icon='done' classes='button__icon--success' onClick={this.handleSave} />
          </React.Fragment>
        )}

        <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
        <ButtonIcon icon='delete' disabled={isEditing || student.theoryClass} onClick={() => onDelete(student.id)} />

        <div
          className={classNames('student__arrows', {
            'student__arrows--hidden': total === 1
          })}>
          <ButtonIcon
            icon='keyboard_arrow_up'
            classes={classNames('button__icon--arrow', {
              'button__icon--arrow--none': total === 1
            })}
            onClick={() => {
              onMove('up', index);
            }}
          />
          <ButtonIcon
            icon='keyboard_arrow_down'
            classes={classNames('button__icon--arrow', {
              'button__icon--arrow--none': total === 1
            })}
            onClick={() => {
              onMove('down', index);
            }}
          />
        </div>
      </div>
    );
  }
}
