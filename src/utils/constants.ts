import { Board, PhaseType, SubtaskType, Task } from "./types";

export const initialSubtask: SubtaskType = {
  _id: 1,
  title: "",
  isCompleted: false,
};

export const initialBoard: Board = {
  name: "",
  phaseList: [],
}

export const initialPhase: PhaseType = {
  _id: 1,
  title: "",
};

export const initialTask: Task = {
  _id: "",
  description: "",
  subtasks: [],
  title: "",
  status: "",
};
