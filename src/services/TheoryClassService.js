let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class TheoryClassService {
  static load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const theoryClasses = window.localStorage.getItem("theoryClasses");
          resolve(theoryClasses ? JSON.parse(theoryClasses) : []);
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }

  static save(theoryClasses) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          window.localStorage.setItem(
            "theoryClasses",
            JSON.stringify(theoryClasses)
          );
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }
}
