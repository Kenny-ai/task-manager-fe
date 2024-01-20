/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import axios from "axios";
import { useStoreVars } from "@/context/states";
import { useAuth } from "./useAuth";
// export const BASE_URL = `https://kb-task-manager.onrender.com`;
export const BASE_URL = `http://localhost:8000/api/v1`;

// export const axiosAuthInstance = axios.create({
//   baseURL: BASE_URL,
//   // timeout: 5000,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${AUTH_TOKEN}`,
//   },
//   withCredentials: true,
// });

// axiosInstance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export const useAxios = () => {
  const { token, setToken, isLoggedIn } = useStoreVars();

  const { logout } = useAuth();

  useEffect(() => {
    let cookies: any;
    if (typeof window === "object" && isLoggedIn) {
      const cookie = document?.cookie;
      if (cookie) {
        cookies = cookie.split(";").reduce((cookies: any, cookie: string) => {
          const [name, val] = cookie.split("=").map((c) => c.trim());
          cookies[name as keyof typeof cookies] = val;
          return cookies;
        }, {});
      }
    }
    setToken(cookies?.payload);
  }, [isLoggedIn, setToken]);

  // console.log({ AUTH_TOKEN });

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Authorization: `Bearer ${"token"}`,
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403) {
        logout.refetch();
        // console.log("");
      }
      return Promise.reject(error);
    }
  );

  return { axiosInstance };
};
