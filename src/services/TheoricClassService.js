export default class TheoricClassService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const theoric_classes = window.localStorage.getItem("theoric_classes");
				resolve(theoric_classes ? JSON.parse(theoric_classes) : []);
				reject();
			}, 1000);
		});
	}
	static save(theoric_classes) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem(
					"theoric_classes",
					JSON.stringify(theoric_classes)
				);
				resolve();
				reject();
			}, 500);
		});
	}
}
