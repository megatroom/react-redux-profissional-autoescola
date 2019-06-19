import React from 'react';
import classNames from 'classnames';

import ButtonIcon from '../Button/ButtonIcon';

import './student.scss';

export default class Student extends React.Component {
  state = {
    isEditing: false,
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
            <button className='student__button student__button--cancel' onClick={this.handleCancel}>
              <i className='material-icons'>clear</i>
            </button>
            <button className='student__button student__button--success' onClick={this.handleSave}>
              <i className='material-icons'>done</i>
            </button>
          </React.Fragment>
        )}
        <button className='student__button' disabled={isEditing} onClick={this.handleEdit}>
          <i className='material-icons'>edit</i>
        </button>
        <ButtonIcon icon='delete' disabled={isEditing || student.theoryClass} onClick={() => onDelete(student.id)} />
        <div
          className={classNames('student__arrows', {
            'student__arrows--hidden': total === 1,
          })}
        >
          <button
            className={classNames('student__button', 'student__button--arrow', {
              'student__button--hidden': index === 0,
            })}
            onClick={() => {
              onMove('up', index);
            }}
          >
            <i className='material-icons'>keyboard_arrow_up</i>
          </button>
          <button
            className={classNames('student__button', 'student__button--arrow', {
              'student__button--hidden': index === total - 1,
            })}
            onClick={() => {
              onMove('down', index);
            }}
          >
            <i className='material-icons'>keyboard_arrow_down</i>
          </button>
        </div>
      </div>
    );
  }
}
