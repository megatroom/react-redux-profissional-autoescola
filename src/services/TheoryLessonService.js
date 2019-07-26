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
            console.log(theoryLesson);
            const theoryLessons = JSON.parse(window.localStorage.getItem("theoryLessons"));
            var newTheoryLessons = theoryLessons.slice();
            const id = theoryLesson.id;
            const index = newTheoryLessons.findIndex(t => t.id === id);
            newTheoryLessons[index].students = theoryLesson.students;
            console.log(newTheoryLessons)
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

}

export default TheoryLessonService