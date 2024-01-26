"use client";
import Logout from "@/components/Logout";
import React, { useEffect } from "react";
import ModalContainer from "@/components/modals/ModalContainer";
import SidebarContainer from "@/components/SidebarContainer";
import { useStoreVars } from "@/context/states";
import Main from "@/components/Main";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const App = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previous = searchParams.get("from");

  useEffect(() => {
    if (previous !== "login") router.push("/login");
  }, [previous, router]);

  const { setBoards, isLoggedIn } = useStoreVars();

  const { axiosInstance } = useAxios();

  const getBoardsFn = async () => {
    const res = await axiosInstance.get(`/boards`);
    setBoards(res.data.data);
    return res;
  };

  const { error } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsFn,
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
  });

  // if (data) toast.success("Boards loaded successfully");

  if (error) toast.error("An error occured loading your boards");

  // useEffect(() => {
  //   console.log({ boards });
  // }, [boards]);

  // useEffect(() => {
  //   console.log({ currentBoard });
  // }, [currentBoard]);

  return (
    <div>
      <Header />

      <SidebarContainer />

      <Logout />

      <Main />

      <ModalContainer />
    </div>
  );
};

export default App;
