import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Home from "./components/homepage";
import Search from "./components/searchdbpage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="navLink">
          <h2>IQMovie</h2>
        </Link>
        <nav>
          {/* <Link to="/" className="navLink">
            Favorites
          </Link> */}
          <Link to="/Search" className="navLink">
            Search Movie DB
          </Link>
        </nav>
      </header>
      <div style={{ minHeight: "75vh", background: "white" }}>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </div>
      <footer className="App-header">
        <a href="https://www.duranirving.com" className="navLink">
          Irving Duran
        </a>
        <a href="https://www.themoviedb.org/" className="navLink">
          The Movie db
        </a>
        <nav>
          <div>
            <a
              href="https://github.com/fixmylifedesigns/moviesdbnodebackend"
              className="navLink"
            >
              Backend-End Repo
            </a>
            <a
              href="https://github.com/fixmylifedesigns/idmoviereactapp"
              className="navLink"
            >
              Front-end Repo
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default App;
