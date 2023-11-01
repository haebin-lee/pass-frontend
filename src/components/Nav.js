import React from "react";

export default function Nav() {
  function onClickSearch() {
    console.log("click search");
  }
  function onClickLogin() {
    console.log("click login");
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
          <a className="navbar-brand" href="#">
            Pass!
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" onClick={onClickSearch}>
                Search
              </button>
            </form>
          </ul>
          <li className="d-flex">
            <button type="button" class="btn btn-outline-success" onClick={onClickLogin}>
              Login
            </button>
          </li>
        </div>
      </div>
    </nav>
  );
}
