import { BASE_URL } from "@/hooks/useAxios";
import { LoginData, RegisterData } from "../utils/types";
import { useRouter } from "next13-progressbar";
import { useStoreVars } from "@/context/states";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAuth = () => {
  const router = useRouter();

  const { setIsLoggedIn, setUserName, setUserId, setBoards, setCurrentBoard } =
    useStoreVars();

  const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const loginFn = async (loginData: LoginData) => {
    const res = await axiosAuthInstance.post(`/auth/login`, loginData);
    return res;
  };

  const registerFn = async (registerData: RegisterData) => {
    const res = await axiosAuthInstance.post(`/auth/register`, registerData);
    return res;
  };

  const logoutFn = async () => {
    const res = await axiosAuthInstance.get(`/auth/logout`);
    setIsLoggedIn(false);
    setUserName("");
    setUserId("");
    setBoards([]);
    setCurrentBoard(undefined);
    router.replace("/login");
    return res;
  };

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserName(data.data.name);
      setUserId(data.data.id);
      router.push("/");
    },
  });

  const register = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserName(data.data.name);
      setUserId(data.data.id);
      router.push("/");
    },
  });

  const logout = useQuery({
    queryKey: ["logout"],
    queryFn: logoutFn,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  // const handleLogout = () => {
  //   logout.refetch();
  //   router.push("/login");
  // };

  return { login, register, logout };
};
