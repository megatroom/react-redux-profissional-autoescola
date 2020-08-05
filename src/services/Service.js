export default class AlunoService {
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
