let failedLoadAttempts = 1;
let failedSaveAttempts = 1;

export default class CarService {
  save(car) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(cars => {
              if (!Array.isArray(cars)) cars = [];

              if (cars.find(c => c.id === car.id)) throw new Error('O sistema apresentou um estado inválido ao salvar o carro.');

              cars.push(car);
              window.localStorage.setItem('cars', JSON.stringify(cars));
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

  saveAll(cars) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          if (!Array.isArray(cars)) throw new Error('O argumento informado ao salvar todos os carros é inválido.');

          window.localStorage.setItem('cars', JSON.stringify(cars));
          resolve();
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  update(car) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          this.list()
            .then(cars => {
              if (!Array.isArray(cars)) cars = [];

              const index = cars.findIndex(c => c.id === car.id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao atualizar o carro.');

              cars[index] = car;
              window.localStorage.setItem('cars', JSON.stringify(cars));
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
            .then(cars => {
              if (!Array.isArray(cars)) throw new Error('O estado do sistema ao remover o carro é inválido.');

              const index = cars.findIndex(car => car.id === id);

              if (index === -1) throw new Error('O sistema apresentou um estado inválido ao remover o carro.');

              cars.splice(index, 1);
              window.localStorage.setItem('cars', JSON.stringify(cars));
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
            .then(cars => {
              const car = Array.isArray(cars) ? cars.find(car => car.id === id) : null;
              resolve(car);
            })
            .catch(() => reject());
        } else {
          failedSaveAttempts++;
          reject();
        }
      }, 1500)
    );
  }

  list(teacher = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const cars = window.localStorage.getItem('cars');
          resolve(cars ? JSON.parse(cars).filter(car => !teacher || !car.enrollment || car.enrollment === teacher.id) : []);
        } else {
          failedLoadAttempts++;
          reject();
        }
      }, 1500);
    });
  }
}
