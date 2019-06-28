let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class StudentService {
  save(student) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(students => {
              if (!Array.isArray(students)) students = [];

              if (students.find(s => s.id === student.id))
                throw new Error('O sistema apresentou um estado inválido ao salvar o estudante.');

              students.push(student);
              window.localStorage.setItem('students', JSON.stringify(students));
              resolve();
            })
            .catch(() => reject());
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  saveAll(students) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          if (!Array.isArray(students)) throw new Error('O argumento informado ao salvar todos os estudantes é inválido.');

          window.localStorage.setItem('students', JSON.stringify(students));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  update(student) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(students => {
              if (!Array.isArray(students)) students = [];

              const index = students.findIndex(s => s.id === student.id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao atualizar o estudante.');

              students[index] = student;
              window.localStorage.setItem('students', JSON.stringify(students));
              resolve();
            })
            .catch(() => reject());
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
          this.list()
            .then(students => {
              if (!Array.isArray(students)) throw new Error('O estado do sistema ao remover o estudante é inválido.');

              const index = students.findIndex(student => student.id === id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao remover o estudante.');

              students.splice(index, 1);
              window.localStorage.setItem('students', JSON.stringify(students));
              resolve();
            })
            .catch(() => reject());
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
          const students = [];

          this.list()
            .then(students => {
              const student = students.find(student => student.id === id);
              resolve(student);
            })
            .catch(() => reject());
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  list(theoryClass = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const students = window.localStorage.getItem('students');
          resolve(
            students
              ? JSON.parse(students).filter(student => !theoryClass || !student.enrollment || student.enrollment === theoryClass.id)
              : []
          );
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }
}
