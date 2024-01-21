"use client";
import React from "react";
import BoardView from "./BoardView";
import { useStoreVars } from "@/context/states";

const Main = () => {
  const { isSidebarOpen } = useStoreVars();
  return (
    <div
      className={`h-screen overflow-auto duration-200 ease-linear ${
        isSidebarOpen ? `md:ml-72` : ``
      }`}
    >
      <BoardView />
    </div>
  );
};

export default Main;
