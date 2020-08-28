export default class TheoreticalClassService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const theoretical_classes = window.localStorage.getItem(
					"theoretical_classes"
				);
				resolve(theoretical_classes ? JSON.parse(theoretical_classes) : []);
				reject();
			}, 1000);
		});
	}
	static save(theoretical_classes) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem(
					"theoretical_classes",
					JSON.stringify(theoretical_classes)
				);
				resolve();
				reject();
			}, 500);
		});
	}
}
