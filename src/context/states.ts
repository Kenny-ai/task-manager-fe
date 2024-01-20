"use client";
import { useBoardStore, useModalStore, useUserStore } from "./store";

export const useStoreVars = () => {
  const token = useUserStore((state) => state.token);

  const setToken = useUserStore((state) => state.setToken);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  const boards = useBoardStore((state) =>
    isLoggedIn ? state.boards : state.localBoards
  );

  const setBoards = useBoardStore((state) =>
    isLoggedIn ? state.setBoards : state.setLocalBoards
  );

  const currentBoard = useBoardStore((state) =>
    isLoggedIn ? state.currentBoard : state.currentLocalBoard
  );

  const setCurrentBoard = useBoardStore((state) =>
    isLoggedIn ? state.setCurrentBoard : state.setCurrentLocalBoard
  );

  const currentTask = useBoardStore((state) =>
    isLoggedIn ? state.currentTask : state.currentLocalTask
  );

  const setCurrentTask = useBoardStore((state) =>
    isLoggedIn ? state.setCurrentTask : state.setCurrentLocalTask
  );

  const userName = useUserStore((state) => state.userName);

  const setUserName = useUserStore((state) => state.setUserName);

  const userId = useUserStore((state) => state.userId);

  const setUserId = useUserStore((state) => state.setUserId);

  const isAddBoardOpen = useModalStore((state) => state.isAddBoardOpen);

  const setIsAddBoardOpen = useModalStore((state) => state.setIsAddBoardOpen);

  const isEditBoardOpen = useModalStore((state) => state.isEditBoardOpen);

  const setIsEditBoardOpen = useModalStore((state) => state.setIsEditBoardOpen);

  const isDeleteBoardOpen = useModalStore((state) => state.isDeleteBoardOpen);

  const setIsDeleteBoardOpen = useModalStore(
    (state) => state.setIsDeleteBoardOpen
  );

  const isAddTaskOpen = useModalStore((state) => state.isAddTaskOpen);

  const setIsAddTaskOpen = useModalStore((state) => state.setIsAddTaskOpen);

  const isEditTaskOpen = useModalStore((state) => state.isEditTaskOpen);

  const setIsEditTaskOpen = useModalStore((state) => state.setIsEditTaskOpen);

  const isDeleteTaskOpen = useModalStore((state) => state.isDeleteTaskOpen);

  const setIsDeleteTaskOpen = useModalStore(
    (state) => state.setIsDeleteTaskOpen
  );

  const isTileDetailsOpen = useModalStore((state) => state.isTileDetailsOpen);

  const setIsTileDetailsOpen = useModalStore(
    (state) => state.setIsTileDetailsOpen
  );

  const isSidebarOpen = useModalStore((state) => state.isSidebarOpen);

  const setIsSidebarOpen = useModalStore((state) => state.setIsSidebarOpen);

  return {
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    boards,
    setBoards,
    currentBoard,
    setCurrentBoard,
    currentTask,
    setCurrentTask,
    userName,
    setUserName,
    userId,
    setUserId,
    isAddBoardOpen,
    setIsAddBoardOpen,
    isEditBoardOpen,
    setIsEditBoardOpen,
    isDeleteBoardOpen,
    setIsDeleteBoardOpen,
    isAddTaskOpen,
    setIsAddTaskOpen,
    isEditTaskOpen,
    setIsEditTaskOpen,
    isDeleteTaskOpen,
    setIsDeleteTaskOpen,
    isTileDetailsOpen,
    setIsTileDetailsOpen,
    isSidebarOpen,
    setIsSidebarOpen,
  };
};
