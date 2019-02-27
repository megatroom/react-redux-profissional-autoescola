let failedLoadAttemps = 2;
let failedSaveAttemps = 2;

class TurmasService {
  static load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttemps > 1) {
          const turmas = window.localStorage.getItem("turmas");
          resolve(turmas ? JSON.parse(turmas) : []);
        } else {
          failedLoadAttemps++;
          reject();
        }
      }, 3000);
    });
  }
  static save(turmas) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedSaveAttemps > 1) {
          window.localStorage.setItem("turmas", JSON.stringify(turmas));
          resolve();
        } else {
          failedSaveAttemps++;
          reject();
        }
      }, 3000);
    });
  }
}

export default TurmasService;
