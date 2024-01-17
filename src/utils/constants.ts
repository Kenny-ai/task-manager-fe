import { Board, PhaseType, Task } from "./types";

// export const initialSubtask: SubtaskType = {
//   id: 0,
//   title: "",
//   completed: false,
// };

export const initialBoard: Board = {
  name: "",
  phases: [],
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
