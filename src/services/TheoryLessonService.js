class TheoryLessonService {

    static load() {
        return new Promise((resolve) => {
            const theoryLessons = window.localStorage.getItem("theoryLessons");
            resolve(theoryLessons ? JSON.parse(theoryLessons) : []);
        });
    }

    static loadById(id) {
        return new Promise((resolve) => {
            var theoryLessons = window.localStorage.getItem("theoryLessons");
            
            if(theoryLessons != null){
                theoryLessons = JSON.parse(theoryLessons);
                theoryLessons = theoryLessons.slice();
                const index = theoryLessons.findIndex(theoryLesson => theoryLesson.id === id);
                const ret = theoryLessons[index];
                resolve(ret);
            }
            resolve(null)
            
        })
    }

    static saveOne(theoryLesson) {
        return new Promise((resolve) =>{
            const theoryLessons = JSON.parse(window.localStorage.getItem("theoryLessons"));
            var newTheoryLessons = theoryLessons.slice();
            const id = theoryLesson.id;
            const index = newTheoryLessons.findIndex(t => t.id === id);
            newTheoryLessons[index].students = theoryLesson.students;
            window.localStorage.setItem("theoryLessons", JSON.stringify(theoryLessons));
            resolve();
        })
    }

    static save(theoryLessons) {
        return new Promise((resolve) => {
            window.localStorage.setItem("theoryLessons", JSON.stringify(theoryLessons));
            resolve();
        })
    }

    static removeStudentFromLessons(stndId) {
        return new Promise((resolve)=> {
            const lessons = JSON.parse(window.localStorage.getItem("theoryLessons"));
            const newLessons = lessons.map((l) => {
                console.log(stndId, l);
                const index = l.students.findIndex(s => s === stndId);
                console.log(index);
                if(index == -1){
                    return l;
                } else {
                    var stndList = l.students.slice();
                    stndList.splice(index,1);
                    var lesson = l;
                    lesson.students = stndList;
                    console.log(stndList)
                    return lesson;
                };
            }); 
            window.localStorage.setItem("theoryLessons", JSON.stringify(newLessons));
            resolve();
        });
        
    }            
            
        

}

export default TheoryLessonService