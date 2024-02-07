import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import "./App.css";
const logo = require("./icon/logo.png");

class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <img className="logo" src={logo} alt="Logo" />
            </li>
            {/* <li>
              <Link to="/Home">Home</Link>
            </li> */}
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* <Route path="/Home" element={<Home />} /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App;