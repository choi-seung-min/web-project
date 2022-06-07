import axios from "axios";

export const checkEmailExists = (email) => axios.get('/api/auth/exists/email/' + email);
export const checkUsernameExists = (userName) =>
  axios.get("/api/auth/exists/userName/" + userName);

export const localRegister = ({ email, username, password }) =>
  axios.post("/api/auth/register/local", { email, username, password });
export const localLogin = ({ email, password }) =>
  axios.post("/api/auth/login/local", { email, password });

export const checkStatus = () => axios.get("/api/auth/check");
export const logout = () => axios.post("/api/auth/logout");