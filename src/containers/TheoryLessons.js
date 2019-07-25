import React from 'react'
import uuid from 'uuid'

import SectionHeader from '../components/SectionHeader';
import NewtheoryLesson from '../components/NewTheoryLesson';
import TheoryLessonService from '../services/TheoryLessonService'
import TheoryLessonList from '../components/TheoryLessonList'

class TheoryLessons extends React.Component {

    state = { isAddingTheoryLesson : false,
    theoryLessons: [] }

    componentDidMount = () => {
        this.handleReload();
    }

    handleCancelAdd = () => {
        this.setState({isAddingTheoryLesson: false});
    }

    handleAddTheoryLesson = text => {
        
            this.setState(prevState => {
                const newtheoryLessons = prevState.theoryLessons.concat({ id: uuid(), text, students: [] });
                this.handleSave(newtheoryLessons);
                return {
                    theoryLessons: newtheoryLessons
                }
            });
        this.setState({isAddingTheoryLesson: false});
    }

    handleSave = theoryLessons => {
        TheoryLessonService.save(theoryLessons);
    }

    handleDelete = id => {
        this.setState(prevState => {
            const newTheoryLessons = prevState.theoryLessons.slice();
            const index = newTheoryLessons.findIndex(theoryLesson => theoryLesson.id === id);
            newTheoryLessons.splice(index, 1)[0];

            this.handleSave(newTheoryLessons);

            return {
                theoryLessons: newTheoryLessons
            };
        });
    }

    handleEdit = (id, text) => {
        this.setState(prevState => {
            const newTheoryLessons = prevState.theoryLessons.slice();
            const index = newTheoryLessons.findIndex(theoryLesson => theoryLesson.id === id);
            newTheoryLessons[index].text = text;

            this.handleSave(newTheoryLessons);

            return {
                theoryLessons: newTheoryLessons
            };
        });
    }

    handleReload = () => {
        TheoryLessonService.load().then(
            theoryLessons => {
                this.setState({theoryLessons: theoryLessons});
            });
    }

    render() {
        const { isAddingTheoryLesson, theoryLessons } = this.state;
        return(
            <div className="container">
                
                    <SectionHeader title={"Aula Teórica"}/>
                    <button className="section-header__action" onClick={
                        () => {
                            this.setState(prevState => {
                                return {
                                    isAddingTheoryLesson: !prevState.isAddingTheoryLesson
                                }
                            })
                        }
                    }><i className="material-icons">add</i></button>
                    <NewtheoryLesson isAddingTheoryLesson={isAddingTheoryLesson} onCancel={this.handleCancelAdd}
                                    onAdd={this.handleAddTheoryLesson}/>
                    <TheoryLessonList theoryLessons={theoryLessons} onEdit={this.handleEdit} onDelete={this.handleDelete} />
                
            </div>
        ) 
    }


}

export default TheoryLessons