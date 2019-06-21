import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import ButtonIcon from '../Button/ButtonIcon';

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
    this.setState({ isEditing: false });
  };

  render() {
    const { theoryClass, index, total, history, onDelete, onMove, onManageEnrollment, onCloseMenu } = this.props;
    const { isEditing, enrollments } = this.state;

    return (
      <div className='theory-class'>
        {isEditing ? (
          <input type='text' className='theory-class__input' defaultValue={theoryClass.name} ref={current => (this.input = current)} />
        ) : (
          <div className='theory-class__text'>
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

        <ButtonIcon
          icon='group'
          disabled={isEditing}
          onClick={() => {
            onManageEnrollment(theoryClass);
            onCloseMenu();
            history.push('/enrollments');
          }}
        />
        <ButtonIcon icon='edit' disabled={isEditing} onClick={this.handleEdit} />
        <ButtonIcon icon='delete' disabled={isEditing || enrollments > 0} onClick={() => onDelete(theoryClass.id)} />

        <div
          className={classNames('theory-class__arrows', {
            'theory-class__arrows--hidden': total === 1
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

export default withRouter(TheoryClass);
