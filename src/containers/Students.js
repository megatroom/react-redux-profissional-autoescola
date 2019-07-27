import React, { Fragment } from 'react'
import uuid from 'uuid'

import NewStudent from '../components/NewStudent'
import StudentList from '../components/StudentList'
import StudentsService from '../services/StudentsService'
import SectionHeader from '../components/SectionHeader'
import TheoryLessonService from '../services/TheoryLessonService';

class Students extends React.Component {

    state = {
        students: []
    }

    componentDidMount() {
        this.handleReload();
    }

    handleAddStudent = text => {
        this.setState(prevState => {
            const newStudents = prevState.students.concat({ id: uuid(), text, lesson: null });
            this.handleSave(newStudents);
            return {
                students: newStudents
            }
        });
    }

    handleDelete = id => {
        this.setState(prevState => {
            const newStudents = prevState.students.slice();
            const index = newStudents.findIndex(student => student.id === id);
            newStudents.splice(index, 1)[0];

            this.handleSave(newStudents);
            TheoryLessonService.removeStudentFromLessons(id);
            return {
                students: newStudents
            };
        });
    }

    handleEdit = (id, text) => {
        this.setState(prevState => {
            const newStudents = prevState.students.slice();
            const index = newStudents.findIndex(student => student.id === id);
            newStudents[index].text = text;

            this.handleSave(newStudents);

            return {
                notes: newStudents
            };
        });
    }

    handleReload = () => {
        StudentsService.load().then(
            students => {
                this.setState({students: students});
            });
    }

    handleSave = students => {
        StudentsService.save(students);
    }

    render() {
        const {students} = this.state;
        
        return (
            <div className="container">
                <SectionHeader title={"Estudantes"} />
                <NewStudent onAddStudent={this.handleAddStudent} />
                <StudentList
                    students={students}
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                />
            </div>
        )
    }
}
export default Students