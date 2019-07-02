let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class PracticalClassService {
  save(practicalClass) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(practicalClasses => {
              if (practicalClasses.find(pc => pc.id === practicalClass.id))
                throw new Error('O sistema apresentou um estado inválido ao salvar a aula prática.');

              practicalClasses.push(practicalClass);
              window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
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

  saveAll(practicalClasses) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          if (!Array.isArray(practicalClasses)) throw new Error('O argumento informado ao salvar todas as aulas práticas é inválido.');

          window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  update(practicalClass) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(practicalClasses => {
              const index = practicalClasses.findIndex(pc => pc.id === practicalClass.id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao atualizar a aula prática.');

              practicalClasses[index] = practicalClass;
              window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
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
            .then(practicalClasses => {
              const index = practicalClasses.findIndex(practicalClass => practicalClass.id === id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao remover a aula prática.');

              practicalClasses.splice(index, 1);
              window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
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
            .then(practicalClasses => {
              const practicalClass = Array.isArray(practicalClasses)
                ? practicalClasses.find(practicalClass => practicalClass.id === id)
                : null;
              resolve(practicalClass);
            })
            .catch(() => reject());
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
          const practicalClasses = window.localStorage.getItem('practicalClasses');
          resolve(practicalClasses ? JSON.parse(practicalClasses) : []);
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }
}
