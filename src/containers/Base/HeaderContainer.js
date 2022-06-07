import React from "react";
import Header, { LoginButton } from "components/Base/Header";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import storage from "lib/storage";

function HeaderContainer(props) {

  const handleLogout = async () => {
    const { UserActions } = props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }

    storage.remove("loggedInfo");
    window.location.href = "/"; // 홈페이지로 새로고침
  };
  
  const { visible, user } = props;
  if (!visible) return null;

  return (
    <Header>
      {user.get("logged") ? (
        <div>
          {user.getIn(["loggedInfo", "username"])}{" "}
          <div onClick={handleLogout}>(로그아웃)</div>
        </div>
      ) : (
        <LoginButton />
      )}
    </Header>
  );
}

export default connect(
  (state) => ({
    visible: state.base.getIn(["header", "visible"]),
    user: state.user,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);
