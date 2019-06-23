let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class TheoryClassService {
  save(theoryClass) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          let theoryClasses = window.localStorage.getItem('theoryClasses');

          if (!theoryClasses) theoryClasses = [];
          else if (theoryClasses.find(theoryClass)) throw new Error('O sistema apresentou um estado inválido ao salvar a aula teórica.');

          theoryClasses.push(theoryClass);
          window.localStorage.setItem('theoryClasses', JSON.stringify(theoryClasses));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  saveAll(theoryClasses) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          if (!Array.isArray(theoryClasses)) throw new Error('O argumento informado ao salvar todas as aulas teóricas é inválido.');

          window.localStorage.setItem('theoryClasses', JSON.stringify(theoryClasses));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  update(theoryClass) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          const theoryClasses = window.localStorage.getItem('theoryClasses');
          const index = theoryClasses.findIndex(t => t.id === theoryClass.id);

          if (index === -1) throw new Error('O sistema apresentou um estado inválido ao atualizar a aula teórica.');

          theoryClasses[index] = theoryClass;
          window.localStorage.setItem('theoryClasses', JSON.stringify(theoryClasses));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  delete(id) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          const theoryClasses = window.localStorage.getItem('theoryClasses');
          const index = theoryClasses.findIndex(t => t.id === student.id);

          if (index === -1) throw new Error('O sistema apresentou um estado inválido ao remover a aula teórica.');

          theoryClasses.splice(index, 1);
          theoryClasses[index] = student;
          window.localStorage.setItem('theoryClasses', JSON.stringify(theoryClasses));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  find(id) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          const theoryClasses = window.localStorage.getItem('theoryClasses');
          const student = theoryClasses.find(theoryClass => theoryClass.id === id);
          resolve(student);
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  list() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const theoryClasses = window.localStorage.getItem('theoryClasses');
          resolve(theoryClasses ? JSON.parse(theoryClasses) : []);
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }
}
