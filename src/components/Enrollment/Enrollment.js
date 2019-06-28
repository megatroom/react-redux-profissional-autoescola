import React from 'react';
import classNames from 'classnames';

import ButtonIcon from '../Button/ButtonIcon';

import './enrollment.scss';

export default class Enrollment extends React.Component {
  render() {
    const { student, theoryClass, onEnroll, onUnenroll } = this.props;

    return (
      <div className='enrollment'>
        <span className='enrollment__text'>{student.name}</span>
        <span
          className={classNames('enrollment__text--done', {
            'enrollment__text--hidden': !student.enrollment
          })}>
          <i className='material-icons'>done</i>
        </span>
        <ButtonIcon
          icon='add'
          classes={classNames({ 'enrollment__button--hidden': student.enrollment })}
          onClick={() => onEnroll(student, theoryClass)}
        />
        <ButtonIcon
          icon='clear'
          classes={classNames({ 'enrollment__button--hidden': !student.enrollment })}
          onClick={() => onUnenroll(student, theoryClass)}
        />
      </div>
    );
  }
}
