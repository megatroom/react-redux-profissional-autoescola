import React, { Component, Children } from 'react';
import classNames from 'classnames';

import ButtonIcon from '../Button/ButtonIcon';

import './list.scss';

const ListItem = ({ children, index, total, onMove }) => (
  <div className='list-item'>
    {children}

    <div
      className={classNames('list-item__arrows', {
        'list-item__arrows--hidden': total === 1
      })}>
      <ButtonIcon
        icon='keyboard_arrow_up'
        classes={classNames('button__icon--arrow', {
          'button__icon--hidden': total === 1 || index === 0
        })}
        onClick={() => {
          onMove('up', index);
        }}
      />
      <ButtonIcon
        icon='keyboard_arrow_down'
        classes={classNames('button__icon--arrow', {
          'button__icon--hidden': total === 1 || index === total - 1
        })}
        onClick={() => {
          onMove('down', index);
        }}
      />
    </div>
  </div>
);

export default ListItem;
