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
                const newTheoryLessonStudents = prevState.lesson.students.concat(newStudents[index]);
                var newLesson = prevState.lesson;
                newLesson.students = newTheoryLessonStudents;
                this.handleSave(newLesson, newStudents);
                return {
                    lesson: newLesson
                }
            });
    }

    handleRemoveStudent = id => {
            this.setState(prevState => {
                var newLesson = prevState.lesson;
                var newStudents = newLesson.students.slice();
                const index = newStudents.findIndex(student => student.id === id);
                newStudents[index].lesson = null;
                const modifySavedStudents = prevState.students.slice();
                const studentIndex = modifySavedStudents.findIndex(st => st.id === newStudents[index].id);
                modifySavedStudents[studentIndex] = newStudents[index];
                newStudents.splice(index, 1)[0];
                newLesson.students = newStudents;
                this.handleSave(newLesson, modifySavedStudents);
                return {
                    lesson: newLesson
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
        console.log(st)
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