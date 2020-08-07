class AlunoService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const alunos = window.localStorage.getItem("alunos");
				resolve(alunos ? JSON.parse(alunos) : []);
				reject();
			}, 1000);
		});
	}
	static save(alunos) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				window.localStorage.setItem("alunos", JSON.stringify(alunos));
				resolve();
				reject();
			}, 500);
		});
	}
}
class ClasseService {
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
export { AlunoService, ClasseService };
