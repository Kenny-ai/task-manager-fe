import { BASE_URL } from "@/hooks/useAxios";
import { LoginData, RegisterData } from "../utils/types";
import { useRouter } from "next13-progressbar";
import { useStoreVars } from "@/context/states";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useAuth = () => {
  const router = useRouter();

  const { setIsLoggedIn, setUserName, setBoards, setCurrentBoard } =
    useStoreVars();

  const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
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

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/login");
    setIsLoggedIn(false);
    setUserName("");
    setBoards([]);
    setCurrentBoard(undefined);
  };

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
    onSuccess: (data) => {
      document.cookie = `token=${data.data.token}`;
      setIsLoggedIn(true);
      setUserName(data.data.name);
      toast.success("Log in successful");
      router.replace("/?from=login");
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  const register = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserName(data.data.name);
      router.push("/");
    },
  });

  // const handleLogout = () => {
  //   logout.refetch();
  //   router.push("/login");
  // };

  return { login, register, logout };
};
