let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class PracticalClassService {
  save(practicalClass) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(practicalClasses => {
              try {
                if (!this.validate(practicalClass, practicalClasses)) throw new Error('O argumento referente à aula prática é inválido.');

                if (practicalClasses.find(pc => pc.id === practicalClass.id))
                  throw new Error('O sistema apresentou um estado inválido ao salvar a aula prática.');

                practicalClasses.push(practicalClass);
                window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
                resolve();
              } catch (error) {
                reject(error.message);
              }
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
          try {
            if (!Array.isArray(practicalClasses) || !this.validateAll(practicalClasses))
              throw new Error('O argumento informado ao salvar todas as aulas práticas é inválido.');

            window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
            resolve();
          } catch (error) {
            reject(error.message);
          }
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
              try {
                if (!this.validate(practicalClass, practicalClasses, true))
                  throw new Error('O argumento referente à aula prática é inválido.');

                const index = practicalClasses.findIndex(pc => pc.id === practicalClass.id);

                if (index === -1) throw new Error('O sistema apresentou um estado inválido ao atualizar a aula prática.');

                practicalClasses[index] = practicalClass;
                window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
                resolve();
              } catch (error) {
                reject(error.message);
              }
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

              if (index > -1) {
                practicalClasses.splice(index, 1);
                window.localStorage.setItem('practicalClasses', JSON.stringify(practicalClasses));
                resolve();
              } else {
                reject('O sistema apresentou um estado inválido ao remover a aula prática.');
              }
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

  list(student = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const practicalClasses = window.localStorage.getItem('practicalClasses');
          resolve(
            practicalClasses ? JSON.parse(practicalClasses).filter(pc => !student || (pc.student && pc.student.id === student.id)) : []
          );
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }

  validate(practicalClass, practicalClasses, isUpdate = false) {
    if (!practicalClass) throw new Error('O argumento referente à aula prática é inválido.');

    if (!Array.isArray(practicalClasses)) throw new Error('O argumento referente à lista de aulas práticas é inválido.');

    const limit = isUpdate ? 10 : 9;
    const { id, student, car, date, hour } = practicalClass;

    if (!student || !car || !date || !hour) throw new Error('O argumento referente à aula prática é inválido.');

    if (!car.teacher) throw new Error('O carro não possui um professor associado.');

    let counter = 0;

    for (let pc of practicalClasses) {
      if (pc.id !== id && pc.student.id === student.id && pc.car.id !== car.id) return false;

      if (pc.id !== id && pc.student.id === student.id && pc.date === date && pc.hour === hour) return false;

      if (pc.student.id === student.id) counter++;
    }

    return counter <= limit;
  }

  validateAll(practicalClasses) {
    if (!Array.isArray(practicalClasses)) throw new Error('O argumento referente à lista de aulas práticas é inválido.');

    let isValid = false;

    for (let practicalClass of practicalClasses) {
      isValid = this.validate(practicalClass, practicalClasses, true);

      if (!isValid) break;
    }

    return isValid;
  }
}
