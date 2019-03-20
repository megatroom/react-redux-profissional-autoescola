let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class StudentService {
  static load() {
    return new Promise((resolve, reject) => {
      const students = window.localStorage.getItem("students");
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          resolve(JSON.parse(students));
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }

  static save(students) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          window.localStorage.setItem("students", JSON.stringify(students));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }
}
