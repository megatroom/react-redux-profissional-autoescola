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
                var newStudents = prevState.students.slice();
                const index = newStudents.findIndex(student => student.id === id);
                newStudents[index].lesson = this.state.lesson.id;
                const newTheoryLessonStudents = prevState.lesson.students.concat(id);
                var newLesson = prevState.lesson;
                newLesson.students = newTheoryLessonStudents;
                this.handleSave(newLesson, newStudents);
                return {
                    lesson: newLesson,
                    students: newStudents
                }
            });
    }

    handleRemoveStudent = id => {
            this.setState(prevState => {
                var newLesson = prevState.lesson;
                var newStudents = prevState.students.slice();
                const index = newStudents.findIndex(student => student.id === id);
                newStudents[index].lesson = null;
                newLesson.students.splice(newLesson.students.findIndex(s => s === id), 1);
                this.handleSave(newLesson, newStudents);
                return {
                    lesson: newLesson,
                    students: newStudents
                };
            });
    }

    handleSave = (newLesson, students) => {
        TheoryLessonService.saveOne(newLesson);
        StudentsService.save(students);
    }

    render() {

        const {lesson, students} = this.state;
        const st = students.filter(student => student.lesson === null || student.lesson === this.state.lesson.id);
        return(
            <div className="container">
                <SectionHeader title={`Turma de ${lesson.text}`}/>
                <AddStudentList 
                    lessonStudents={lesson.students} 
                    students={st} 
                    onAdd={this.handleIncludeStudent} 
                    onDelete={this.handleRemoveStudent} 
                />
            </div>
        )
    }
}

export default AddStudents