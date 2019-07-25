import React from "react"

import TheoryLesson from "./TheoryLesson"

const TheoryLessonList = ({ theoryLessons, onDelete, onEdit }) => (
    <div className="note-list">
        {theoryLessons.map((theoryLesson, index) => (
            <TheoryLesson 
                key={theoryLesson.id} 
                theoryLesson={theoryLesson} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                index={index} 
                total={theoryLessons.length} 
            />
        ))}
    </div>
);

export default TheoryLessonList