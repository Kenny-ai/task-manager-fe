// export const emptyBoard = { _id: "", name: "", phaseList: [], tasks: [] };

// Auth Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface PhaseType {
  _id: number;
  title: string;
}

// Board Types
export interface Board {
  _id?: string;
  name: string;
  phaseList?: PhaseType[];
  tasks?: Task[];
}

export interface SubtaskType {
  _id: number;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  subtasks?: SubtaskType[];
  status: string;
}

// Store Data types
export interface BoardState {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  currentBoard: Board | undefined;
  setCurrentBoard: (board: Board | undefined) => void;
  currentTask: Task;
  setCurrentTask: (task: Task) => void;

  localBoards: Board[];
  setLocalBoards: (boards: Board[]) => void;
  currentLocalBoard: Board | undefined;
  setCurrentLocalBoard: (board: Board | undefined) => void;
  currentLocalTask: Task;
  setCurrentLocalTask: (task: Task) => void;
}

export interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userName: string;
  setUserName: (userName: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  token: string;
  setToken: (userId: string) => void;
}
export interface ThemeState {
  theme: string;
  setTheme: (userName: string) => void;
}

export interface ModalState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
  isAddBoardOpen: boolean;
  setIsAddBoardOpen: (val: boolean) => void;
  isEditBoardOpen: boolean;
  setIsEditBoardOpen: (val: boolean) => void;
  isDeleteBoardOpen: boolean;
  setIsDeleteBoardOpen: (val: boolean) => void;
  isDeleteTaskOpen: boolean;
  setIsDeleteTaskOpen: (val: boolean) => void;
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (val: boolean) => void;
  isEditTaskOpen: boolean;
  setIsEditTaskOpen: (val: boolean) => void;
  isTileDetailsOpen: boolean;
  setIsTileDetailsOpen: (val: boolean) => void;
  isBoardOpsOpen: boolean;
  setIsBoardOpsOpen: (val: boolean) => void;
}

interface PhaseReqType {
  title: string;
}

interface SubtaskReqType {
  title: string;
  isCompleted: boolean;
}

export interface CreateBoardData {
  name: string;
  phaseList: PhaseReqType[];
}

export interface CreateTaskData {
  title: string;
  description?: string;
  subtasks?: SubtaskReqType[];
  status: string;
}

export interface UpdateTaskData {
  title: string;
  description?: string;
  subtasks?: SubtaskReqType[];
  status: string;
}

export interface UpdateBoardData {
  name?: string;
  phaseList?: PhaseReqType[];
}
