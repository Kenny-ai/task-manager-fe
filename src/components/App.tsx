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

const App = () => {
  const { setBoards, isLoggedIn, currentBoard } = useStoreVars();

  const { axiosInstance } = useAxios();

  const getBoardsFn = async () => {
    const res = await axiosInstance.get(`/boards`);
    setBoards(res.data.data);
    return res;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuery<unknown, { response?: any }>({
    queryKey: ["boards"],
    queryFn: getBoardsFn,
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
  });

  // if (error?.response.status === 403) logout.refetch();

  // useEffect(() => {
  //   console.log({ boards });
  // }, [boards]);

  useEffect(() => {
    console.log({ currentBoard });
  }, [currentBoard]);

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
