"use client";
import Logout from "@/components/Logout";
import { useBoards } from "@/hooks/useBoards";
import React, { useEffect } from "react";
import ModalContainer from "@/components/modals/ModalContainer";
import SidebarContainer from "@/components/SidebarContainer";
import { useStoreVars } from "@/context/states";
import Main from "@/components/Main";
import { useAuth } from "@/hooks/useAuth";

const App = () => {
  const { logout } = useAuth();

  const { boards, isLoggedIn, currentBoard } = useStoreVars();

  const { getBoards } = useBoards();

  // getBoards();

  // useEffect(() => {
  //   if (isLoggedIn) getBoards.refetch();
  // }, [isLoggedIn]);

  useEffect(() => {
    console.log({ isLoggedIn });
  }, [isLoggedIn]);

  if (getBoards.error?.response.status === 403) logout.refetch();

  useEffect(() => {
    console.log({ boards });
  }, [boards]);

  useEffect(() => {
    console.log({ currentBoard });
  }, [currentBoard]);

  return (
    <div>
      <SidebarContainer />

      <Logout />

      <Main />

      <ModalContainer />
    </div>
  );
};

export default App;
