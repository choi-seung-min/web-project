import React, { useEffect, useCallback } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError,
} from "components/Auth";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import { connect } from "react-redux";
import storage from "lib/storage";
import { useNavigate, useLocation } from "react-router-dom";
import { fromJS } from "immutable";
import queryString from "query-string";

function Login(props) {

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = useCallback(
    e => { 
      const { AuthActions } = props;
      const { name, value } = e.target;

      AuthActions.changeInput({
        name,
        value,
        form: "login",
      });
    },
    [props]
  );

  // const handleChange = (e) => {
  //   const { AuthActions } = props;
  //   const { name, value } = e.target;

  //   AuthActions.changeInput({
  //     name,
  //     value,
  //     form: "login",
  //   });
  // };

  // componentWillUnmount() {
  //   const { AuthActions } = props;
  //   AuthActions.initializeForm("login");
  // }

  useEffect(() => {
    // const { location } = props;
    const query = queryString.parse(location.search);

    if (query.expired !== undefined) {
      setError("세션에 만료되었습니다. 다시 로그인하세요.");
    }
    return () => { 
      const { AuthActions } = props;
      AuthActions.initializeForm("login");
      console.log(props);
    }
  }, []);

  const setError = (message) => {
    const { AuthActions } = props;
    AuthActions.setError({
      form: "login",
      message,
    });
    return false;
  };

  const handleLocalLogin = async () => {
    const { form, AuthActions, UserActions } = props;
    const { email, password } = form.toJS();

    try {
      const res = await AuthActions.localLogin({ email, password });
      const loggedInfo = fromJS({
        username: res.data.username,
        thumbnail: res.data.thumbnail,
      }).toJS();
      // const loggedInfo = props.result.toJS();

      UserActions.setLoggedInfo(loggedInfo);
      navigate("/");
      storage.set("loggedInfo", loggedInfo);
    } catch (e) {
      console.log(e);
      setError("잘못된 계정정보입니다.");
    }
  };

  console.log(props);
  var email = "", password = "";
  const form = props.form;
  if (typeof form !== 'undefined') {
    const jsForm = form.toJS();
    email = jsForm.email;
    password = jsForm.password;
  }
  // const { email, password } = props.form?.toJS();
  // const { email, password } = useSelector(state => ({ 
  //   email: state.form.email,
  //   password: state.form.password,
  // }));
  const { error } = props;

  return (
    <AuthContent title="로그인">
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        value={email}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={handleChange}
      />
      {error && <AuthError>{error}</AuthError>}
      <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthContent>
  );
}

export default connect(
  (state) => ({
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(Login);
