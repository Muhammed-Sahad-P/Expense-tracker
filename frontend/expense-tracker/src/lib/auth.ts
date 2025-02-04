import { apiClient } from "./api";
import Cookies from "js-cookie";

export const signup = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/register", user);
  return response.data;
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/login", credentials);

  const token = response.data?.data?.user?.token;
  if (token) {
    Cookies.set("token", token);
  } else {
    console.error("⚠️ No token received from backend");
  }

  return response.data;
};
