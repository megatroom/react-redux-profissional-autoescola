export default class PracticalClassService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const practical_classes = window.localStorage.getItem(
					"practical_classes"
				);
				resolve(practical_classes ? JSON.parse(practical_classes) : []);
				reject();
			}, 1000);
		});
	}
	static save(practical_classes) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem(
					"practical_classes",
					JSON.stringify(practical_classes)
				);
				resolve();
				reject();
			}, 500);
		});
	}
}
