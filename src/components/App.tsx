"use client";
import Logout from "@/components/Logout";
import React from "react";
import ModalContainer from "@/components/modals/ModalContainer";
import SidebarContainer from "@/components/SidebarContainer";
import { useStoreVars } from "@/context/states";
import Main from "@/components/Main";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import { toast } from "react-toastify";

const App = () => {
  const { setBoards, isLoggedIn } = useStoreVars();

  const { axiosInstance } = useAxios();

  const getBoardsFn = async () => {
    const res = await axiosInstance.get(`/boards`);
    setBoards(res.data.data);
    return res;
  };

  const { data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsFn,
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
  });

  if (data) toast.success("Boards loaded successfully");

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
