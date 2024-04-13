import {
  Board,
  BoardState,
  ModalState,
  Task,
  ThemeState,
  UserState,
} from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [],

      setBoards: (boards: Board[]) => set(() => ({ boards: [...boards] })),

      currentBoard: undefined,

      setCurrentBoard: (board: Board | undefined) =>
        set(() => ({ currentBoard: board })),

      currentTask: {
        _id: "",
        title: "",
        description: "",
        subtasks: [],
        status: "",
      },

      setCurrentTask: (task: Task) => set(() => ({ currentTask: task })),

      localBoards: [],

      setLocalBoards: (boards: Board[]) =>
        set(() => ({ localBoards: [...boards] })),

      currentLocalBoard: undefined,

      setCurrentLocalBoard: (board: Board | undefined) =>
        set(() => ({ currentLocalBoard: board })),

      currentLocalTask: {
        title: "",
        description: "",
        subtasks: [],
        status: "",
      },

      setCurrentLocalTask: (task: Task) =>
        set(() => ({ currentLocalTask: task })),
    }),

    { name: "board-data" }
  )
);

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,

      setIsLoggedIn: (val: boolean) => set(() => ({ isLoggedIn: val })),

      userName: "",

      setUserName: (userName: string) => set(() => ({ userName })),

      token: "",

      setToken: (token: string) => set(() => ({ token })),
    }),
    { name: "user-data" }
  )
);

export const useModalStore = create<ModalState>((set) => ({
  isSidebarOpen: true,

  setIsSidebarOpen: (val: boolean) => set(() => ({ isSidebarOpen: val })),

  isAddBoardOpen: false,

  setIsAddBoardOpen: (val: boolean) => set(() => ({ isAddBoardOpen: val })),

  isEditBoardOpen: false,

  setIsEditBoardOpen: (val: boolean) => set(() => ({ isEditBoardOpen: val })),

  isDeleteBoardOpen: false,

  setIsDeleteBoardOpen: (val: boolean) =>
    set(() => ({ isDeleteBoardOpen: val })),

  isDeleteTaskOpen: false,

  setIsDeleteTaskOpen: (val: boolean) => set(() => ({ isDeleteTaskOpen: val })),

  isAddTaskOpen: false,

  setIsAddTaskOpen: (val: boolean) => set(() => ({ isAddTaskOpen: val })),

  isEditTaskOpen: false,

  setIsEditTaskOpen: (val: boolean) => set(() => ({ isEditTaskOpen: val })),

  isTileDetailsOpen: false,

  setIsTileDetailsOpen: (val: boolean) =>
    set(() => ({ isTileDetailsOpen: val })),

  isBoardOpsOpen: false,

  setIsBoardOpsOpen: (val: boolean) => set(() => ({ isBoardOpsOpen: val })),
}));

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",

      setTheme: (theme: string) => set(() => ({ theme })),
    }),
    { name: "user-theme" }
  )
);
