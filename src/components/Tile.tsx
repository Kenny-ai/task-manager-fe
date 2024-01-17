import React from "react";
import { Task } from "@/utils/types";
import { useBoards } from "@/hooks/useBoards";
import { useStoreVars } from "@/context/states";
import { useDrag } from "react-dnd";

export type DragSource = {
  id: string;
  source: string;
};

interface Props {
  task: Task;
  dragSource: DragSource;
}

const Tile = ({ task, dragSource }: Props) => {
  const { setIsTileDetailsOpen, setCurrentTask } = useStoreVars();

  const { numberOfCompleted } = useBoards();

  const handleTaskClick = () => {
    setIsTileDetailsOpen(true);
    setCurrentTask(task);
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "tile",
    item: dragSource,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`${
        isDragging ? `opacity-0` : `opacity-1`
      } w-full bg-color-white dark:bg-dark-secondary-bg font-bold px-4 py-8 rounded-xl shadow-md cursor-move group`}
      onClick={handleTaskClick}
      ref={dragRef}
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
