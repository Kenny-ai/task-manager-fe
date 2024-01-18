"use client";
import React, { useState } from "react";
import Icon from "./Icon";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useRouter } from "next13-progressbar";
import BoardOptions from "./modals/BoardOptions";
import { useAuth } from "@/hooks/useAuth";
import { useStoreVars } from "@/context/states";

const Header = () => {
  const { logout } = useAuth();
  const {
    isSidebarOpen,
    setIsAddTaskOpen,
    userName,
    isLoggedIn,
    currentBoard,
    setIsSidebarOpen,
  } = useStoreVars();

  const handleBoardOpschange = (state: boolean) => {
    setIsBoardOpsOpen(state);
  };

  const [isBoardOpsOpen, setIsBoardOpsOpen] = useState(false);

  const router = useRouter();
  
  const goToLoginPage = () => {
    router.push("/login");
  };

  const handleAuthButton = () => {
    isLoggedIn ? logout.refetch() : goToLoginPage;
  };

  const formatBoardName = () => {
    const boardName = currentBoard?.name;
    if (boardName?.length && boardName?.length > 17) {
      const formattedName = boardName.substring(0, 17) + "...";
      return formattedName;
    }
    return boardName;
  };

  let addTaskDisabled = false;

  if (!currentBoard) {
    addTaskDisabled = true;
  } else if (currentBoard.phaseList!.length === 0) {
    addTaskDisabled = false;
  }

  return (
    <header
      className={`${
        isSidebarOpen ? `w-full md:w-[calc(100vw-18rem)]` : `w-full`
      } h-[6.5rem] flex justify-between items-center bg-color-white dark:bg-dark-secondary-bg p-6 border-y border-light-lines dark:border-dark-light-lines fixed duration-300 ease-linear`}
    >
      <div className="flex gap-2 items-center">
        <Icon
          src="/assets/logo-mobile.svg"
          alt="kanban-logo"
          className="md:hidden"
        />
        <div
          className="flex gap-2 items-center cursor-pointer group"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <h3 className="text-xl lg:text-2xl text-color-black dark:text-color-white font-black group-hover:text-color-light-purple">
            {formatBoardName()}
          </h3>
          <Icon
            src="/assets/icon-chevron-down.svg"
            alt="arrow-down"
            className="group-hover:translate-y-0.5 duration-200 md:hidden"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {
          <button
            className={`hidden md:block bg-color-purple hover:bg-color-light-purple px-4 py-2 rounded-xl cursor-pointer duration-200 font-bold text-color-white`}
            onClick={handleAuthButton}
          >
            {`${isLoggedIn ? `Logout` : `Log in`} `}
          </button>
        }

        <button
          className={`bg-color-purple hover:bg-color-light-purple p-3 md:p-4 rounded-xl cursor-pointer duration-200 font-bold text-color-white flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-color-purple`}
          disabled={addTaskDisabled}
          onClick={() => setIsAddTaskOpen(true)}
        >
          <Icon src="/assets/icon-add-task-mobile.svg" alt="add-task" />
          <span className="hidden md:inline">Add Task</span>{" "}
        </button>

        {isLoggedIn && (
          <button className="bg-color-purple hover:bg-color-light-purple text-color-white text-xl font-medium w-9 h-9 md:w-12 md:h-12 rounded-full">
            {userName[0]?.toUpperCase()}
          </button>
        )}

        <ClickAwayListener onClickAway={() => setIsBoardOpsOpen(false)}>
          <div>
            <Tooltip title="Edit" arrow>
              <span>
                <button
                  onClick={() => setIsBoardOpsOpen(true)}
                  className="w-4 group parent hover:bg-dark-main-bg py-2 disabled:cursor-not-allowed disabled:opacity-50
                select-none"
                  disabled={currentBoard ? false : true}
                >
                  <Icon
                    src="/assets/icon-vertical-ellipsis.svg"
                    alt="options"
                    className="duration-200 m-auto child"
                  />
                </button>
              </span>
            </Tooltip>
            {isBoardOpsOpen ? (
              <BoardOptions changeIsOpen={handleBoardOpschange} />
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    </header>
  );
};

export default Header;
