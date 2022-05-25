import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Auth } from "pages";
import HeaderContainer from "containers/Base/HeaderContainer";

class App extends Component {
  render() {
    return (
      // <Routes>
      //   <Route exact path="/" element={<Home/>} />
      //   <Route path="/auth" element={<Auth/>} />
      // </Routes>
      <div>
        <HeaderContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </div>
    );
  }
}

export default App;
