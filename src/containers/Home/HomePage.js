import React from 'react';
import { withRouter } from 'react-router-dom';

import withSettings from '../Settings/withSettings';
import { Button, Header } from '../../components';

import './home.scss';

const services = [
  { label: 'Aula Teórica', icon: 'class', path: '/theory-classes' },
  { label: 'Aula Prática', icon: 'speedometer', path: '/practical-classes' }
];

const records = [
  { icon: 'person', label: 'Alunos', path: '/students' },
  { icon: 'school', label: 'Professores', path: '/teachers' },
  { icon: 'directions_car', label: 'Carros', path: '/cars' }
];

const HomePage = ({ selectedTheme, history, onCloseMenu }) => (
  <div className='home'>
    <Header>Serviços</Header>
    {services.map(service => (
      <Button
        key={service.icon}
        style={selectedTheme.style}
        onClick={() => {
          onCloseMenu();
          history.push(service.path);
        }}>
        <i className='material-icons'>{service.icon}</i>
        <span>{service.label}</span>
      </Button>
    ))}
    <Header>Cadastros</Header>
    {records.map(record => (
      <Button
        key={record.icon}
        style={selectedTheme.style}
        onClick={() => {
          onCloseMenu();
          history.push(record.path);
        }}>
        <i className='material-icons'>{record.icon}</i>
        <span>{record.label}</span>
      </Button>
    ))}
  </div>
);

export default withRouter(withSettings(HomePage));
