import axios from "axios";
import { enqueueSnackbar } from "notistack"
import { getAuthToken } from "../Utils/auth";
import { SERVER_URL } from "./config";
import store from "../Redux/store";
import { AUTH_REDUCERS_TYPES, AuthReducerActions } from "../Redux/Reducers/authReducer";

export const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

instance.interceptors.request.use((config) => {
  const token = getAuthToken();

  config.headers.token = token;

  return config;
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const status = error.response.status;
  const isAuth = store.getState().AuthPage.isAuth;

  if (status === 401 && isAuth) {
    store.dispatch(AuthReducerActions[AUTH_REDUCERS_TYPES.LOGOUT]());
    enqueueSnackbar("Ошибка авторизации", {
      variant: "error",
    });
  }

  return Promise.reject(error);
});

export type Response<D> = {
  status: "success" | "error";
  data: D;
};
