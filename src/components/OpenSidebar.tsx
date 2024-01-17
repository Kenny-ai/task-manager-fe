import React from "react";
import Icon from "./Icon";
import { Tooltip } from "@mui/material";
import { useStoreVars } from "@/context/states";

const OpenSidebar = () => {
  const { setIsSidebarOpen } = useStoreVars();

  return (
    <Tooltip title="Open sidebar" arrow>
      <button
        className={`hidden md:inline-block bg-color-purple hover:bg-color-light-purple p-5 rounded-r-full fixed bottom-5 left-0 z-10`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Icon src="/assets/icon-show-sidebar.svg" alt="open-sidebar" />
      </button>
    </Tooltip>
  );
};

export default OpenSidebar;
