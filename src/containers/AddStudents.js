import React from "react"
import StudentsService from "../services/StudentsService"
import TheoryLessonService from "../services/TheoryLessonService"
import SectionHeader from "../components/SectionHeader"
import AddStudentList from '../components/AddStudentList'



class AddStudents extends React.Component {

    state = {
        students: [],
        lesson: {}
    }

    

    componentDidMount = () => {
        this.handleLoadLesson();
        this.handleLoadStudents();
    }

    handleLoadLesson = () => {
        const {id} = this.props;
        TheoryLessonService.loadById(id).then(
            lesson => {
                this.setState(
                    {
                        lesson: lesson
                    }
                );
            }
        );
        
    }

    handleLoadStudents = () => {
        StudentsService.load().then(students => {
            
            this.setState({students: students});
        });
    }

    handleIncludeStudent = id => {
            this.setState(prevState => {
                const newStudents = prevState.students.slice();
                const index = newStudents.findIndex(student => student.id === id);
                const newTheoryLessonStudents = prevState.lesson.students.concat(newStudents[index]);
                var newLesson = prevState.lesson;
                newLesson.students = newTheoryLessonStudents;
                this.handleSave(newLesson);
                return {
                    lesson: newLesson
                }
            });
    }

    handleRemoveStudent = id => {
            this.setState(prevState => {
                var newLesson = prevState.lesson;
                const newStudents = newLesson.students.slice();
                const index = newStudents.findIndex(student => student.id === id);
                newStudents.splice(index, 1)[0];
                newLesson.students = newStudents;
                this.handleSave(newLesson);
                return {
                    lesson: newLesson
                };
            });
    }

    handleSave = (newLesson) => {
        TheoryLessonService.saveOne(newLesson);
    }

    render() {

        const {lesson, students} = this.state;
                
        return(
            <div className="container">
                <SectionHeader title={`Turma de ${lesson.text}`}/>
                <AddStudentList 
                    lessonStudents={lesson.students} 
                    students={students} 
                    onAdd={this.handleIncludeStudent} 
                    onDelete={this.handleRemoveStudent} 
                />
            </div>
        )
    }
}

export default AddStudents