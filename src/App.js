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
          <Link to="/" className="navLink">
            Favorites
          </Link>
          <Link to="/Search" className="navLink">
            Search Movie DB
          </Link>
        </nav>
      </header>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
    </div>
  );
}

export default App;
