import React from "react";
import { withRouter } from "react-router-dom";

const Home = ({ history }) => (
  <div className="home">
    <div className="home__servicos">
      <h1>Serviços</h1>
      <div className="line" />
      <button
        className="home__button"
        onClick={() => {
          history.push("/aula-teorica");
        }}
      >
        <i className="material-icons">edit</i>
        <span>Aula Teórica</span>
      </button>
    </div>
    <div className="home__Cadastros">
      <h1>Cadastros</h1>
      <div className="line" />
      <button
        className="home__button"
        onClick={() => {
          history.push("/alunos");
        }}
      >
        <i className="material-icons">perm_identity</i>
        <span>Alunos</span>
      </button>
    </div>
  </div>
);

export default withRouter(Home);
