import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "redux/modules/base";
import { AuthWrapper } from "components/Auth";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "containers/Auth";

class Auth extends Component {
  // 페이지에 진입 할 때 헤더를 비활성화
  componentDidMount() {
    this.props.BaseActions.setHeaderVisibility(false);
  }

  // 페이지에서 벗어 날 때 다시 활성화
  componentWillUnmount() {
    this.props.BaseActions.setHeaderVisibility(true);
  }

  render() {
    return (
      <AuthWrapper>
        <Routes>
          {/* <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} /> */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </AuthWrapper>
    );
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(Auth);
