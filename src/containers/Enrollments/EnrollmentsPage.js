import React from 'react';

import { EnrollmentList, Error } from '../../components';

export default class EnrollmentsPage extends React.Component {
  state = {
    students: []
  };

  filterStudentsAbleToEnroll = () => {
    const { theoryClass, students } = this.props;

    if (!students) {
      throw new Error('The students is invalid.');
    } else if (!Array.isArray(students)) {
      throw new Error('The students does not match the array type.');
    }

    students.forEach(student => {
      if (student && (!student.theoryClass || student.theoryClass === theoryClass.id)) this.setState(state => state.students.push(student));
    });
  };

  componentDidMount() {
    this.filterStudentsAbleToEnroll();
  }

  render() {
    const { theoryClass, reloadHasError, onEnroll, onUnenroll, onRetry } = this.props;

    const { students } = this.state;

    if (reloadHasError || theoryClass == null) return <Error onRetry={onRetry} />;

    return (
      <React.Fragment>
        <div className='students__container'>
          <h2>{theoryClass.name}</h2>
        </div>
        <EnrollmentList students={students} theoryClass={theoryClass} onEnroll={onEnroll} onUnenroll={onUnenroll} />
      </React.Fragment>
    );
  }
}
