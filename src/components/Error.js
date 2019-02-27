import React from "react";

const Error = ({ onRetry, erro }) => (
  <div className="error">
    <h1>Ops!</h1>
    <p>{erro.text}</p>
    <button className="error__button" onClick={onRetry}>
      Tentar novamente
    </button>
  </div>
);

export default Error;
