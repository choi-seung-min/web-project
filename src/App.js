import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Auth } from "./pages";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    );
  }
}

export default App;
