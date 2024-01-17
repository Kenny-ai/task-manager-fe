"use client";
import { useEffect } from "react";
import { useUserStore } from "@/context/store";
import axios from "axios";
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
  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

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

  const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return { axiosInstance, axiosAuthInstance };
};
