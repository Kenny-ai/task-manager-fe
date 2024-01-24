"use client";
import axios from "axios";
import { useAuth } from "./useAuth";
export const BASE_URL = `https://kb-task-manager.onrender.com/api/v1`;
// export const BASE_URL = `http://localhost:8000/api/v1`;

export const useAxios = () => {
  const cookies = document.cookie;
  const index = cookies?.indexOf("=");
  const token = cookies?.substring(index + 1);

  const { logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${"token"}`,
    },
    withCredentials: true,
    // timeout: 10000,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return { axiosInstance };
};
