import axios from "axios";
import { getAuthToken } from "../Utils/auth";
import { SERVER_URL } from "./config";

export const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

instance.interceptors.request.use((config) => {
  const token = getAuthToken();

  config.headers.token = token;

  return config;
});

export type Response<D> = {
  status: "success" | "error";
  data: D;
};
