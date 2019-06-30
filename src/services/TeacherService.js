let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class TeacherService {
  save(teacher) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(teachers => {
              if (!Array.isArray(teachers)) teachers = [];

              if (teachers.find(t => t.id === teacher.id))
                throw new Error('O sistema apresentou um estado inválido ao salvar o estudante.');

              teachers.push(teacher);
              window.localStorage.setItem('teachers', JSON.stringify(teachers));
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

  saveAll(teachers) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          if (!Array.isArray(teachers)) throw new Error('O argumento informado ao salvar todos os estudantes é inválido.');

          window.localStorage.setItem('teachers', JSON.stringify(teachers));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  update(teacher) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(teachers => {
              if (!Array.isArray(teachers)) teachers = [];

              const index = teachers.findIndex(t => t.id === teacher.id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao atualizar o estudante.');

              teachers[index] = teacher;
              window.localStorage.setItem('teachers', JSON.stringify(teachers));
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
            .then(teachers => {
              if (!Array.isArray(teachers)) throw new Error('O estado do sistema ao remover o estudante é inválido.');

              const index = teachers.findIndex(teacher => teacher.id === id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao remover o estudante.');

              teachers.splice(index, 1);
              window.localStorage.setItem('teachers', JSON.stringify(teachers));
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
          this.list()
            .then(teachers => {
              const teacher = Array.isArray(teachers) ? teachers.find(teacher => teacher.id === id) : null;
              resolve(teacher);
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
          const teachers = window.localStorage.getItem('teachers');
          resolve(
            teachers
              ? JSON.parse(teachers).filter(teacher => !theoryClass || !teacher.enrollment || teacher.enrollment === theoryClass.id)
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
