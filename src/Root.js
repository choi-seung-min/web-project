import React from "react";
import { BrowserRouter } from "react-router-dom";
//, Route, Routes
import App from "./App";
import { Provider } from 'react-redux';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Routes>
        <Route path="/" component={App} />
      </Routes> */}
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
