export default class ClasseService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const classes = window.localStorage.getItem("classes");
				resolve(classes ? JSON.parse(classes) : []);
				reject();
			}, 1000);
		});
	}
	static save(classes) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem("classes", JSON.stringify(classes));
				resolve();
				reject();
			}, 500);
		});
	}
}
