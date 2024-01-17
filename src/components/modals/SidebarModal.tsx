import React from "react";
import ThemeChanger from "../ThemeChanger";
import Icon from "../Icon";
import { Board } from "@/utils/types";
import { useStoreVars } from "@/context/states";

const SidebarModal = () => {
  const {
    isLoggedIn,
    boards,
    setIsAddBoardOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    currentBoard,
    setCurrentBoard,
  } = useStoreVars();

  const handleClick = (board: Board) => () => {
    setCurrentBoard(board);
    setIsSidebarOpen(false);
  };

  return (
    isSidebarOpen && (
      <div className="md:hidden z-10 absolute top-0 w-full">
        <div
          className="bg-black opacity-50 h-screen"
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div className="max-w-[20rem] w-full bg-color-white dark:bg-dark-secondary-bg shadow-md rounded-lg absolute left-[calc(50vw-10rem)] top-[calc(50vh-196px)] pt-4 pb-8">
          <div className="text-color-medium-gray pr-8 overflow-auto mb-4">
            <h5 className="text-sm font-bold tracking-widest pl-8 mb-6">
              ALL BOARDS ({boards?.length})
            </h5>
            <ul className="flex flex-col gap-1 max-h-[20rem] h-full">
              {boards?.map((board) => (
                <li
                  onClick={handleClick(board)}
                  key={isLoggedIn ? board._id : boards.indexOf(board)}
                  className={`${
                    currentBoard?.name === board.name
                      ? `bg-color-purple text-color-white`
                      : `hover:text-color-purple hover:bg-light-main-bg`
                  } py-3 flex items-center gap-3 rounded-r-full cursor-pointer pl-8 font-bold`}
                >
                  <span>
                    <Icon
                      src="/assets/icon-board.svg"
                      alt=""
                      className={`${
                        currentBoard === board ? `sidebar-active` : ``
                      } board-logo`}
                    />
                  </span>
                  {board.name}
                </li>
              ))}
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

          <div className="flex justify-center">
            <ThemeChanger />
          </div>
        </div>
      </div>
    )
  );
};

export default SidebarModal;
