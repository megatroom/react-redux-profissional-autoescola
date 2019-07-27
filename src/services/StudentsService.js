class StudentsService {

    static load() {
        return new Promise((resolve) => {
            const students = window.localStorage.getItem("students");
            resolve(students ? JSON.parse(students) : []);
        });
    }

    static save(students) {
        return new Promise((resolve) => {
            window.localStorage.setItem("students", JSON.stringify(students));
            resolve();
        })
    }

    static removeStudentsFromLesson(lsnId) {
        return new Promise((resolve) => {
        const students = JSON.parse(window.localStorage.getItem("students"));
        const newStudents = students.map(s => {
            if(s.lesson === lsnId){
                s.lesson = null;
            }
            return s;
        })
        window.localStorage.setItem("students", JSON.stringify(students));
        resolve();
        });
    };

}

export default StudentsService