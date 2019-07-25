class TheoryLessonService {

    static load() {
        return new Promise((resolve) => {
            const theoryLesson = window.localStorage.getItem("theoryLesson");
            resolve(theoryLesson ? JSON.parse(theoryLesson) : []);
        });
    }

    static save(theoryLesson) {
        return new Promise((resolve) => {
            window.localStorage.setItem("theoryLesson", JSON.stringify(theoryLesson));
            resolve();
        })
    }

}

export default TheoryLessonService