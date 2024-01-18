import { useBoards } from "@/hooks/useBoards";
import { useStoreVars } from "@/context/states";
import React, { forwardRef } from "react";
import Loading from "../Loading";

type Ref = HTMLFormElement;
interface Props {
  type: "Board" | "Task";
  children?: React.ReactNode;
}

const Delete = forwardRef<Ref, Props>(function Delete({ type, ...props }, ref) {
  const {
    isLoggedIn,
    currentTask,
    currentBoard,
    setBoards,
    setIsDeleteBoardOpen,
    setIsDeleteTaskOpen,
  } = useStoreVars();

  const { deleteLocalBoard, deleteLocalTask, deleteBoard, deleteTask } =
    useBoards();
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      if (type === "Board") {
        deleteBoard.mutate();
      } else if (type === "Task") {
        deleteTask.mutate();
      }
    } else {
      if (type === "Board") {
        deleteLocalBoard();
        setIsDeleteBoardOpen(false);
      } else {
        const newBoards = deleteLocalTask();
        setBoards(newBoards);
        setIsDeleteTaskOpen(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ms:h-fit">
      <form
        className="max-w-[30rem] w-full bg-color-white dark:bg-dark-secondary-bg px-8 py-6 shadow-md rounded-lg flex flex-col gap-4 ms:absolute ms:left-[calc(50vw-15rem)] ms:top-[calc(50vh-10rem)]"
        {...props}
        ref={ref}
        onSubmit={onSubmit}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-color-red">
            Delete this {type}?
          </h3>
          {deleteBoard.isLoading || deleteTask.isLoading ? <Loading /> : ``}
        </div>
        {type === "Board" ? (
          <p className="text-sm text-color-medium-gray leading-6">
            Are you sure you want to delete the ‘{currentBoard!.name}’ {type}?
            This action will remove all columns and tasks and cannot be
            reversed.
          </p>
        ) : (
          <p className="text-sm text-color-medium-gray leading-6">
            Are you sure you want to delete the ‘{currentTask.title}’ {type}?
            This action will remove all columns and tasks and cannot be
            reversed.
          </p>
        )}

        <div className="flex justify-between">
          <button
            className="bg-color-red hover:bg-color-light-red duration-300 text-color-white rounded-full py-2 text-sm font-bold w-2/5 grid place-items-center"
            type="submit"
          >
            {deleteBoard.isLoading || deleteTask.isLoading
              ? `Deleting...`
              : `Delete`}
          </button>
          <button
            className="bg-blue-100 hover:bg-blue-200 duration-300 text-color-purple rounded-full py-2 text-sm font-bold w-2/5"
            type="button"
            onClick={() =>
              type === "Board"
                ? setIsDeleteBoardOpen(false)
                : setIsDeleteTaskOpen(false)
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});

export default Delete;
