import { useStoreVars } from "@/context/states";
import {
  Board,
  CreateBoardData,
  Task,
  UpdateBoardData,
  CreateTaskData,
  UpdateTaskData,
} from "@/utils/types";
import { useAxios } from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBoards = () => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();

  const {
    boards,
    setBoards,
    currentBoard,
    setCurrentBoard,
    currentTask,
    setIsAddBoardOpen,
    setIsEditBoardOpen,
    setIsDeleteBoardOpen,
    setIsAddTaskOpen,
    setIsEditTaskOpen,
    setIsDeleteTaskOpen,
  } = useStoreVars();

  const boardId = currentBoard?._id;
  const taskId = currentTask?._id;

  const createBoardFn = async (boardData: CreateBoardData) => {
    const res = await axiosInstance.post(`/boards`, boardData);
    return res;
  };

  const createBoard = useMutation({
    mutationKey: ["createBoard"],
    mutationFn: createBoardFn,
    onSuccess: () => {
      setIsAddBoardOpen(false);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const updateBoardFn = async (boardData: UpdateBoardData) => {
    const res = await axiosInstance.put(
      `/boards?_id=${currentBoard?._id}`,
      boardData
    );
    return res;
  };

  const updateBoard = useMutation({
    mutationKey: ["updateBoard"],
    mutationFn: updateBoardFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setCurrentBoard(data.data.board);
      setIsEditBoardOpen(false);
    },
  });

  const deleteBoardFn = async () => {
    const res = await axiosInstance.delete(`/boards?id=${boardId}`);
    return res;
  };

  const deleteBoard = useMutation({
    mutationKey: ["deleteBoard"],
    mutationFn: deleteBoardFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setCurrentBoard(undefined);
      setIsDeleteBoardOpen(false);
    },
  });

  const createTaskFn = async (taskData: CreateTaskData) => {
    const res = await axiosInstance.post(
      `/boards/tasks?id=${boardId}`,
      taskData
    );
    return res;
  };

  const createTask = useMutation({
    mutationKey: ["createTask"],
    mutationFn: createTaskFn,
    onSuccess: () => {
      setIsAddTaskOpen(false);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const createLocalTask = (task: Task) => {
    const array = boards.map((board) => {
      if (board._id === boardId) {
        if (board.tasks) {
          board.tasks.push(task);
        } else {
          board.tasks = [task];
        }
        return board;
      }
      return board;
    });
    return array;
  };

  const updateTaskFn = async (taskData: UpdateTaskData) => {
    const res = await axiosInstance.put(
      `/boards/tasks?boardId=${boardId}&taskId=${taskId}`,
      taskData
    );
    return res;
  };

  const updateTask = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: updateTaskFn,
    onSuccess: () => {
      setIsEditTaskOpen(false);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const updateLocalTask = (update: Task) => {
    const array = boards.map((board) => {
      if (board._id === boardId) {
        board.tasks?.map((task) => {
          if (task._id === taskId && update) {
            task.title = update.title;
            task.description = update.description;
            task.subtasks = update.subtasks;
            task.status = update.status;
          }
          return task;
        });
      }
      return board;
    });
    return array;
  };

  const deleteTaskFn = async () => {
    const res = await axiosInstance.delete(
      `/boards/tasks?boardId=${boardId}&taskId=${taskId}`
    );
    return res;
  };

  const deleteTask = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: deleteTaskFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setIsDeleteTaskOpen(false);
    },
  });

  const deleteLocalTask = () => {
    const array = boards.map((board) => {
      if (board._id === boardId) {
        board.tasks = board.tasks!.filter((task) => task._id !== taskId);
      }
      return board;
    });
    return array;
  };

  const createLocalBoard = (board: Board) => {
    const newBoards = [...boards, board];
    setBoards(newBoards);
    setCurrentBoard(board);
  };

  const updateLocalBoard = (update: Board) => {
    const array = boards.map((board) => {
      if (board._id === boardId) {
        board.name = update.name;
        board.phaseList = update.phaseList;
      }
      return board;
    });
    setBoards(array);
    return array;
  };

  const deleteLocalBoard = () => {
    setBoards(boards.filter((board) => board._id !== boardId));
    setCurrentBoard(undefined);
  };

  const toggleSubtaskCompleted = (subtaskId: number) => {
    const array = boards.map((board) => {
      if (board._id === boardId) {
        board.tasks?.map((task) => {
          if (task._id === taskId) {
            task.subtasks?.map((subtask) => {
              if (subtask._id === subtaskId)
                subtask.isCompleted = !subtask.isCompleted;
            });
          }
          return task;
        });
      }
      return board;
    });
    setBoards(array);
  };

  const changeTaskStatus = (status: string) => {
    const array = boards.map((board) => {
      if (board._id === boardId) {
        board.tasks?.map((task) => {
          if (task._id === taskId) {
            task.status = status;
          }
          return task;
        });
      }
      return board;
    });
    setBoards(array);
  };

  const numberOfCompleted = (task: Task) =>
    task.subtasks?.filter((subtask) => subtask.isCompleted).length;

  const dragResolver = ({
    id,
    source,
    destination,
  }: {
    id: string;
    source: string;
    destination: string;
  }) => {
    if (source !== destination) {
      const array = boards.map((board) => {
        if (board._id === boardId) {
          board.tasks?.map((task) => {
            if (task._id === id) {
              task.status = destination;
            }
            return task;
          });
        }
        return board;
      });
      setBoards(array);
      return array;
    }
  };

  const checkDuplicateBoardName = (name: string) => {
    const names = boards.map((board) => board.name);
    return names.includes(name);
  };

  return {
    createBoard,
    updateBoard,
    deleteBoard,
    createLocalBoard,
    updateLocalBoard,
    deleteLocalBoard,
    createTask,
    updateTask,
    deleteTask,
    createLocalTask,
    updateLocalTask,
    deleteLocalTask,
    toggleSubtaskCompleted,
    changeTaskStatus,
    numberOfCompleted,
    dragResolver,
    checkDuplicateBoardName,
  };
};
