import React, { Fragment } from 'react';

import ButtonIcon from '../Button/ButtonIcon';
import ListItem from '../List/ListItem';

import './theory-class.scss';

class TheoryClass extends React.Component {
  state = {
    isEditing: false,
    enrollments: 0
  };

  componentDidMount() {
    const enrollments = this.props.theoryClass.enrollments;

    if (enrollments) this.setState({ enrollments: enrollments.length });
  }

  handleEdit = () => this.setState({ isEditing: true });

  handleCancel = () => this.setState({ isEditing: false });

  handleSave = () => {
    this.props.onEdit(this.props.theoryClass.id, this.input.value);
    this.props.theoryClass.name = this.input.value;
    this.setState({ isEditing: false });
  };

  render() {
    const { theoryClass, index, total, saveHasError, onDelete, onMove, onManageEnrollment } = this.props;
    const { isEditing, enrollments } = this.state;

    return (
      <ListItem index={index} total={total} onMove={onMove}>
        <Fragment>
          {isEditing ? (
            <input type='text' className='list-item__input' defaultValue={theoryClass.name} ref={current => (this.input = current)} />
          ) : (
            <div className='list-item__text'>
              <span>{theoryClass.name}</span>
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

          <ButtonIcon icon='group' disabled={isEditing || saveHasError} onClick={() => onManageEnrollment(theoryClass)} />
          <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
          <ButtonIcon icon='delete' disabled={isEditing || enrollments > 0} onClick={() => onDelete(theoryClass.id)} />
        </Fragment>
      </ListItem>
    );
  }
}

export default TheoryClass;
