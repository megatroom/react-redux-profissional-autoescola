import React, { Fragment } from 'react';

import ButtonIcon from '../Button/ButtonIcon';
import ListItem from '../List/ListItem';

import './practical-class.scss';

class PracticalClass extends React.Component {
  state = {
    isEditing: false,
    enrollments: 0
  };

  componentDidMount() {
    const enrollments = this.props.practicalClass.enrollments;

    if (enrollments) this.setState({ enrollments: enrollments.length });
  }

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    this.props.onEdit(this.props.practicalClass.id, this.input.value);
    this.props.practicalClass.name = this.input.value;
    this.setState({ isEditing: false });
  };

  render() {
    const { practicalClass, index, total, saveHasError, onDelete, onMove, onManageEnrollment } = this.props;
    const { isEditing, enrollments } = this.state;

    return (
      <ListItem index={index} total={total} onMove={onMove}>
        <Fragment>
          {isEditing ? (
            <input type='text' className='list-item__input' defaultValue={practicalClass.name} ref={current => (this.input = current)} />
          ) : (
            <div className='list-item__text'>
              <span>{practicalClass.name}</span>
              <br />
              <span>{enrollments > 0 ? (enrollments == 1 ? enrollments + ' aluno' : enrollments + ' alunos') : 'Nenhum aluno'}</span>
            </div>
          )}
          {isEditing && (
            <React.Fragment>
              <ButtonIcon icon='clear' classes='button__icon--cancel' onClick={this.handleCancel} />
              <ButtonIcon icon='done' classes='button__icon--success' onClick={this.handleSave} />
            </React.Fragment>
          )}

          <ButtonIcon icon='group' disabled={isEditing || saveHasError} onClick={() => onManageEnrollment(practicalClass)} />
          <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
          <ButtonIcon icon='delete' disabled={isEditing || enrollments > 0} onClick={() => onDelete(practicalClass.id)} />
        </Fragment>
      </ListItem>
    );
  }
}

export default PracticalClass;
