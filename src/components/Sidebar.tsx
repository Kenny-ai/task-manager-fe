import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import Icon from "./Icon";
import OpenSidebar from "./OpenSidebar";
import ThemeChanger from "./ThemeChanger";
import { useStoreVars } from "@/context/states";
import { useBoards } from "@/hooks/useBoards";

const Sidebar = () => {
  const { theme } = useTheme();

  const {
    boards,
    setIsAddBoardOpen,
    currentBoard,
    setCurrentBoard,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useStoreVars();

  const { createBoard } = useBoards();
  const { isLoading, variables } = createBoard;

  return (
    <>
      <nav
        className={`${
          isSidebarOpen ? `` : `-ml-72`
        } w-72 pt-8 h-screen bg-color-white dark:bg-dark-secondary-bg border-r border-light-lines dark:border-dark-light-lines fixed z-10 hidden md:inline-block duration-300 ease-linear`}
      >
        <Link href="/">
          <Icon
            src={`${
              theme === `light`
                ? `/assets/logo-dark.svg`
                : `/assets/logo-light.svg`
            }`}
            alt="kanban-logo"
            priority
            className="mb-12 ml-8"
          />
        </Link>

        <div className="text-color-medium-gray h-4/6 pr-8 py-4 shadow dark:shadow-md mb-6 overflow-auto border-t border-light-lines dark:border-dark-light-lines">
          <h5 className="text-sm font-bold tracking-widest mb-6 ml-8">
            ALL BOARDS ({boards?.length})
          </h5>
          <ul>
            {boards?.map((board) => (
              <li
                onClick={() => setCurrentBoard(board)}
                key={board._id}
                className={`${
                  currentBoard?._id === board._id
                    ? `bg-color-purple text-color-white`
                    : `hover:text-color-purple hover:bg-light-main-bg`
                } py-3 flex items-center gap-3 rounded-r-full cursor-pointer pl-8 font-bold mb-2`}
              >
                <span>
                  <Icon
                    src="/assets/icon-board.svg"
                    alt=""
                    className={`${
                      currentBoard?._id === board._id ? `sidebar-active` : ``
                    } board-logo`}
                  />
                </span>
                {board.name}
              </li>
            ))}
            {isLoading ? (
              <li
                // onClick={() => setCurrentBoard(board)}
                // key={variables?._id}
                className={`${
                  currentBoard?.name === variables?.name
                    ? `bg-color-purple text-color-white`
                    : `hover:text-color-purple hover:bg-light-main-bg`
                } py-3 flex items-center gap-3 rounded-r-full cursor-pointer pl-8 font-bold mb-2 opacity-50`}
              >
                <span>
                  <Icon
                    src="/assets/icon-board.svg"
                    alt=""
                    className={`${
                      currentBoard?.name === variables?.name
                        ? `sidebar-active`
                        : ``
                    } board-logo`}
                  />
                </span>
                {variables?.name}
              </li>
            ) : (
              <></>
            )}
            <li
              className="py-3 flex items-center gap-3 rounded-r-full cursor-pointer text-color-purple hover:opacity-70 duration-200 pl-8 font-bold"
              onClick={() => setIsAddBoardOpen(true)}
            >
              <span>
                <Icon
                  src="/assets/icon-board.svg"
                  alt=""
                  className={`board-logo sidebar-create`}
                />
              </span>
              + Create New Board
            </li>
          </ul>
        </div>

        <div className="flex justify-center mb-4">
          <ThemeChanger />
        </div>

        <div className="pr-4">
          <button
            className="py-3 flex items-center gap-3 rounded-r-full cursor-pointer hover:opacity-70 duration-200 font-semibold text-color-medium-gray px-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <>
              <Icon src="/assets/icon-hide-sidebar.svg" alt="hide-sidebar" />
            </>{" "}
            Hide Sidebar
          </button>
        </div>
      </nav>
      {isSidebarOpen ? null : <OpenSidebar />}
    </>
  );
};

export default Sidebar;
