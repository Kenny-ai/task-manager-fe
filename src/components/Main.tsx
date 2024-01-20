"use client";
import React from "react";
import Header from "./Header";
import BoardView from "./BoardView";
import { useStoreVars } from "@/context/states";

const Main = () => {
  const { isSidebarOpen } = useStoreVars();
  return (
    <div
      className={`relative h-screen overflow-auto duration-200 ease-linear ${
        isSidebarOpen ? `md:ml-72` : ``
      }`}
    >
      <Header />
      <BoardView />
    </div>
  );
};

export default Main;
