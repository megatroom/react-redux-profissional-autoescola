import React, { Fragment } from 'react';

import ButtonIcon from '../Button/ButtonIcon';
import ListItem from '../List/ListItem';

import './teacher.scss';

export default class Teacher extends React.Component {
  state = {
    isEditing: false
  };

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    this.props.onEdit(this.props.teacher.id, this.input.value);
    this.props.teacher.name = this.input.value;
    this.setState({ isEditing: false });
  };

  render() {
    const { teacher, index, total, onDelete, onMove } = this.props;
    const { isEditing } = this.state;

    return (
      <ListItem index={index} total={total} onMove={onMove}>
        <Fragment>
          {isEditing ? (
            <input type='text' className='list-item__input' defaultValue={teacher.name} ref={current => (this.input = current)} />
          ) : (
            <span className='list-item__text'>{teacher.name}</span>
          )}
          {isEditing && (
            <React.Fragment>
              <ButtonIcon icon='clear' classes='button__icon--cancel' onClick={this.handleCancel} />
              <ButtonIcon icon='done' classes='button__icon--success' onClick={this.handleSave} />
            </React.Fragment>
          )}

          <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
          <ButtonIcon icon='delete' disabled={isEditing || teacher.enrollment} onClick={() => onDelete(teacher.id)} />
        </Fragment>
      </ListItem>
    );
  }
}
