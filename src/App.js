import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Auth } from "pages";
import HeaderContainer from "containers/Base/HeaderContainer";

import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";

function App(props) {

  const initializaUserInfo = async () => {
    const loggedInfo = storage.get("loggedInfo");
    console.log(loggedInfo);
    if (!loggedInfo) return;

    const { UserActions } = props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove("loggedInfo");
      window.location.href = '/auth/login?expired';
    }
  }

  // componentDidMount() {
  //   this.initializaUserInfo();
  // }

  useEffect(() => {
    initializaUserInfo();
  }, []);

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

export default connect(null, (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch),
}))(App);
