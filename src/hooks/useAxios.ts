"use client";
import axios from "axios";
import { useAuth } from "./useAuth";
import { useStoreVars } from "@/context/states";
export const BASE_URL = `https://kb-task-manager.onrender.com/api/v1`;
// export const BASE_URL = `http://localhost:8000/api/v1`;

export const useAxios = () => {
  const { logout } = useAuth();

  const { token } = useStoreVars();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    // timeout: 20000,
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
