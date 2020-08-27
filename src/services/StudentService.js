export default class StudentService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const students = window.localStorage.getItem("students");
				resolve(students ? JSON.parse(students) : []);
				reject();
			}, 1000);
		});
	}
	static save(students) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem("students", JSON.stringify(students));
				resolve();
				reject();
			}, 500);
		});
	}
}
