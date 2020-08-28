export default class TeacherService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const teachers = window.localStorage.getItem("teachers");
				resolve(teachers ? JSON.parse(teachers) : []);
				reject();
			}, 1000);
		});
	}
	static save(teachers) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem("teachers", JSON.stringify(teachers));
				resolve();
				reject();
			}, 500);
		});
	}
}
