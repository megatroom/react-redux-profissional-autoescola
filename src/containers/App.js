import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import uuid from "uuid/v1";

import NavigationDrawer from "../components/NavigationDrawer";
import AppBar from "../components/AppBar";

import Home from "./Home";
import AulaTeorica from "./AulaTeorica";
import Alunos from "./Alunos";
import TurmaAlunos from "./TurmaAlunos";

import AlunosService from "../services/AlunosService";
import TurmasService from "../services/TurmasService";

class App extends React.Component {
  state = {
    alunos: [],
    turmas: [],
    isMenuOpen: false,
    saveAlunosHasError: false,
    reloadAlunosHasError: false,
    saveTurmasHasError: false,
    reloadTurmasHasError: false
  };
  componentDidMount() {
    this.handleLoadAlunos();
    this.handleLoadTurmas();
  }
  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };
  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };
  handleAddAluno = text => {
    this.setState(prevState => {
      const alunos = prevState.alunos.concat({ id: uuid(), text, turma: "" });

      this.handleSaveAlunos(alunos);

      return { alunos };
    });
  };
  handleDeleteAluno = id => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === id);
      newAlunos.splice(index, 1);

      this.handleSaveAlunos(newAlunos);

      return {
        alunos: newAlunos
      };
    });
  };
  handleEditAluno = (id, text) => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === id);
      newAlunos[index].text = text;

      this.handleSaveAlunos(newAlunos);

      return {
        alunos: newAlunos
      };
    });
  };
  handleSaveAlunos = alunos => {
    this.setState({ isLoading: true });
    AlunosService.save(alunos)
      .then(() => {
        this.setState({ isLoading: false, saveAlunosHasError: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, saveAlunosHasError: true });
      });
  };
  handleLoadAlunos = () => {
    this.setState({ isLoading: true, reloadAlunosHasError: false });

    AlunosService.load()
      .then(alunos => {
        this.setState({ alunos, isLoading: false });
      })
      .catch(() => {
        this.setState({ reloadAlunosHasError: true, isLoading: false });
      });
  };
  handleAddTurma = text => {
    this.setState(prevState => {
      const turmas = prevState.turmas.concat({ id: uuid(), text, alunos: [] });

      this.handleSaveTurmas(turmas);

      return { turmas };
    });
  };
  handleSaveTurmas = turmas => {
    this.setState({ isLoading: true });
    TurmasService.save(turmas)
      .then(() => {
        this.setState({ isLoading: false, saveTurmasHasError: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, saveTurmasHasError: true });
      });
  };
  handleLoadTurmas = () => {
    this.setState({ isLoading: true, reloadTurmasHasError: false });

    TurmasService.load()
      .then(turmas => {
        this.setState({ isLoading: false, turmas });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadTurmasHasError: true });
      });
  };
  handleEditTurma = (id, text) => {
    this.setState(prevState => {
      const newTurmas = prevState.turmas.slice();
      const index = newTurmas.findIndex(turma => turma.id === id);

      newTurmas[index].text = text;

      this.handleSaveTurmas(newTurmas);

      return {
        turmas: newTurmas
      };
    });
  };
  handleDeleteTurma = id => {
    this.setState(prevState => {
      const newTurmas = prevState.turmas.slice();
      const index = newTurmas.findIndex(turma => turma.id === id);

      newTurmas.splice(index, 1);

      this.handleSaveTurmas(newTurmas);

      return {
        turmas: newTurmas
      };
    });
  };

  handleIncluirAlunoTurma = (idAluno, idTurma) => {
    this.setState(prevState => {
      const newTurmas = prevState.turmas.slice();
      const newAlunos = prevState.alunos.slice();
      const indexTurma = newTurmas.findIndex(turma => turma.id === idTurma);
      const indexAluno = newAlunos.findIndex(aluno => aluno.id === idAluno);

      newTurmas[indexTurma].alunos.push(newAlunos[indexAluno].id);
      newAlunos[indexAluno].turma = newTurmas[indexTurma].id;

      this.handleSaveAlunos(newAlunos);
      this.handleSaveTurmas(newTurmas);

      return {
        turmas: newTurmas,
        alunos: newAlunos
      };
    });
  };

  handleExcluirAlunoTurma = alunoId => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const indexAluno = newAlunos.findIndex(aluno => aluno.id === alunoId);

      const turmaId = newAlunos[indexAluno].turma;
      const newTurmas = prevState.turmas.slice();
      const indexTurma = newTurmas.findIndex(turma => turma.id === turmaId);

      const indexAlunoTurma = newTurmas[indexTurma].alunos.findIndex(
        aluno => aluno === alunoId
      );
      newTurmas[indexTurma].alunos.splice(indexAlunoTurma, 1);
      newAlunos[indexAluno].turma = "";

      return {
        alunos: newAlunos,
        turmas: newTurmas
      };
    });
  };

  render() {
    const {
      isMenuOpen,
      alunos,
      turmas,
      isLoading,
      saveAlunosHasError,
      reloadAlunosHasError,
      saveTurmasHasError,
      reloadTurmasHasError
    } = this.state;
    return (
      <Router>
        <div>
          <AppBar
            onOpenMenu={this.handleOpenMenu}
            isLoading={isLoading}
            onRetrySaveAlunos={() => {
              this.handleSaveAlunos(alunos);
            }}
            onRetrySaveTurmas={() => {
              this.handleSaveTurmas(turmas);
            }}
            saveAlunosHasError={saveAlunosHasError}
            saveTurmasHasError={saveTurmasHasError}
          />
          <NavigationDrawer
            isOpen={isMenuOpen}
            onCloseMenu={this.handleCloseMenu}
          />
          <div className="container">
            <Fragment>
              <Route path="/" exact render={props => <Home />} />
              <Route
                path="/aula-teorica"
                exact
                render={props => (
                  <AulaTeorica
                    turmas={turmas}
                    onAddTurma={this.handleAddTurma}
                    reloadHasError={reloadTurmasHasError}
                    onRetry={() => {
                      this.handleLoadTurmas();
                    }}
                    onDeleteTurma={this.handleDeleteTurma}
                    onEditTurma={this.handleEditTurma}
                  />
                )}
              />
              <Route
                path="/alunos"
                exact
                render={props => (
                  <Alunos
                    alunos={alunos}
                    onAddAluno={this.handleAddAluno}
                    onDeleteAluno={this.handleDeleteAluno}
                    onEditAluno={this.handleEditAluno}
                    reloadHasError={reloadAlunosHasError}
                    onRetry={() => {
                      this.handleLoadAlunos();
                    }}
                  />
                )}
              />
              <Route
                path="/turma/:id"
                exact
                render={props => (
                  <TurmaAlunos
                    {...props}
                    turmas={turmas}
                    alunos={alunos}
                    onIncluirAluno={this.handleIncluirAlunoTurma}
                    onExcluirAluno={this.handleExcluirAlunoTurma}
                  />
                )}
              />
            </Fragment>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
