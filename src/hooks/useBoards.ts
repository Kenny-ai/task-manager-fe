import { useStoreVars } from "@/context/states";
import {
  Board,
  CreateBoardData,
  Task,
  UpdateBoardData,
} from "@/utils/types";
import { useAxios } from "@/hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  } = useStoreVars();

  const boardId = currentBoard?._id;
  const taskId = currentTask?._id;

  const getBoardsFn = async () => {
    const res = await axiosInstance.get(`/boards`);
    setBoards(res.data.data);
    return res;
  };

  const getBoards = useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsFn,
    // enabled: false,
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
  });

  const createBoardFn = async (boardData: CreateBoardData) => {
    const res = await axiosInstance.post(`/boards`, boardData);
    return res;
  };

  const createBoard = useMutation({
    mutationKey: ["createBoard"],
    mutationFn: createBoardFn,
    onSuccess: () => {
      // const { name, phases, tasks, _id } = data.data.data;
      // console.log(data.data);
      // queryClient.invalidateQueries({ queryKey: ["boards"] });
      // setBoards([...boards, { name, tasks, _id, phaseList: phases }]);
      // console.log({ name, phases, tasks, _id });
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
      // const { name, phases, tasks, _id } = data.data.data;
      console.log(data.data);
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setCurrentBoard(data.data.board);
      setIsEditBoardOpen(false);
    },
  });

  const deleteBoard = () => {
    axiosInstance.delete(`/boards?id=${boardId}`);
  };

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
              if (subtask.id === subtaskId)
                subtask.completed = !subtask.completed;
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
    task.subtasks?.filter((subtask) => subtask.completed).length;

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
    getBoards,
    createBoard,
    updateBoard,
    deleteBoard,
    createLocalBoard,
    updateLocalBoard,
    deleteLocalBoard,
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
