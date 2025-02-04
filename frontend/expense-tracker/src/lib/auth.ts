import { apiClient } from "./api";

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
  return response.data;
};
