export default class NoteService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const notes = window.localStorage.getItem("notes");
				resolve(notes ? JSON.parse(notes) : []);
				reject();
			}, 1000);
		});
	}
	static save(notes) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem("notes", JSON.stringify(notes));
				resolve();
				reject();
			}, 500);
		});
	}
}
