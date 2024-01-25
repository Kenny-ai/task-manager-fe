import React from "react";
import { Task } from "@/utils/types";
import { useBoards } from "@/hooks/useBoards";
import { useStoreVars } from "@/context/states";

interface Props {
  task: Task;
}

const Tile = ({ task }: Props) => {
  const { setIsTileDetailsOpen, setCurrentTask } = useStoreVars();

  const { numberOfCompleted } = useBoards();

  const handleTaskClick = () => {
    setIsTileDetailsOpen(true);
    setCurrentTask(task);
  };

  return (
    <div
      className={`w-full bg-color-white dark:bg-dark-secondary-bg font-bold px-4 py-8 rounded-xl shadow-md cursor-pointer group`}
      onClick={handleTaskClick}
    >
      <p className="text-color-black dark:text-color-white mb-2 group-hover:text-color-light-purple">
        {task?.title}
      </p>
      <p className="text-xs text-color-medium-gray">{`${numberOfCompleted(
        task
      )} of ${task.subtasks?.length} subtasks`}</p>
    </div>
  );
};

export default Tile;
