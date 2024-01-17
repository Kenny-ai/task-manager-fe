"use client";
import React from "react";
import Sidebar from "./Sidebar";
import SidebarModal from "./modals/SidebarModal";

const SidebarContainer = () => {
  return (
    <>
      <Sidebar />
      <SidebarModal />
    </>
  );
};

export default SidebarContainer;
