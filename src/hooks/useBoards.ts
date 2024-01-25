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
import { toast } from "react-toastify";

export const useBoards = () => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();

  const {
    isLoggedIn,
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
    setIsTileDetailsOpen,
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
      toast.success("Board created");
    },
    onError: () => {
      toast.error("An error occured");
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
      toast.success("Board updated");
    },
    onError: () => {
      toast.error("An error occured");
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
      toast.success("Board deleted");
    },
    onError: () => {
      toast.error("An error occured");
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
      toast.success("Task created");
    },
    onError: () => {
      toast.error("An error occured");
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
      setIsTileDetailsOpen(false);
      toast.success("Task updated");
    },
    onError: () => {
      toast.error("An error occured");
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
      toast.success("Task deleted");
    },
    onError: () => {
      toast.error("An error occured");
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
    if (isLoggedIn) {
      currentTask.subtasks?.map((subtask) => {
        if (subtask._id === subtaskId)
          subtask.isCompleted = !subtask.isCompleted;
      });
      // console.log(currentTask);
    } else {
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
    }
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

  const checkDuplicateBoardName = (name: string, update: boolean) => {
    let names: string[];
    if (update) {
      names = boards
        .map((board) => board.name)
        .filter((name) => name !== currentBoard?.name);
    } else {
      names = boards.map((board) => board.name);
    }
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
    checkDuplicateBoardName,
  };
};
