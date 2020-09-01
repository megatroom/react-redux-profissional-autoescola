export default class CarService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const cars = window.localStorage.getItem("cars");
				resolve(cars ? JSON.parse(cars) : []);
				reject();
			}, 1000);
		});
	}
	static save(cars) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem("cars", JSON.stringify(cars));
				resolve();
				reject();
			}, 500);
		});
	}
}
