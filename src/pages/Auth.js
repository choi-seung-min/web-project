import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import { AuthWrapper } from "components/Auth";
import { Login, Register } from "containers/Auth";
import { useLocation } from "react-router";

function Auth(props) {
  // 페이지에 진입 할 때 헤더를 비활성화
  // componentDidMount() {
  //   this.props.BaseActions.setHeaderVisibility(false);
  // }

  // 페이지에서 벗어 날 때 다시 활성화
  // componentWillUnmount() {
  //   this.props.BaseActions.setHeaderVisibility(true);
  // }

  useEffect(() => {
    props.BaseActions.setHeaderVisibility(false);
    return () => {
      props.BaseActions.setHeaderVisibility(true);
    }
  }, []);

  return (
      <AuthWrapper>
        <MyRouteBuilder />
        {/* <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes> */}
      </AuthWrapper>
  );
}

function MyRouteBuilder() { 
  let location = useLocation();
  if (location.pathname === '/auth/login') {
    return <Login />
  } else if (location.pathname === "/auth/register") {
    return <Register />;
  } else {
    return null;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Auth);
