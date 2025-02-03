import { apiClient } from "./api";

export const signup = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post(
    "http://localhost:5000/api/auth/register",
    user
  );
  return response.data;
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await apiClient.post(
    "http://localhost:5000/api/auth/login",
    credentials
  );
  return response.data;
};
