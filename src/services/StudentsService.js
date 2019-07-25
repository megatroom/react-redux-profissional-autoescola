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

}

export default StudentsService