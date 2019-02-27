let failedLoadAttemps = 2;
let failedSaveAttemps = 2;

class AlunosService {
  static load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttemps > 1) {
          const alunos = window.localStorage.getItem("alunos");
          resolve(alunos ? JSON.parse(alunos) : []);
        } else {
          failedLoadAttemps++;
          reject();
        }
      }, 3000);
    });
  }
  static save(alunos) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedSaveAttemps > 1) {
          window.localStorage.setItem("alunos", JSON.stringify(alunos));
          resolve();
        } else {
          failedSaveAttemps++;
          reject();
        }
      }, 3000);
    });
  }
}

export default AlunosService;
