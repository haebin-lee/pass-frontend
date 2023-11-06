import React from "react";

export default function Nav() {
  function onClickLogin() {

  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            Pass!
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <li className="d-flex">
            <button type="button" className="btn btn-outline-success" onClick={onClickLogin}>
              Login
            </button>
          </li>
        </div>
      </div>
    </nav>
  );
}
