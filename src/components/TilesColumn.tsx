"use client";
import React, { useEffect, useState } from "react";
import Tile, { DragSource } from "./Tile";
import { Task } from "@/utils/types";
import { useStoreVars } from "@/context/states";
import { useDrop } from "react-dnd";
import { useBoards } from "@/hooks/useBoards";

interface Props {
  phase: string;
  color?: string;
}

const TilesColumn = ({ phase, color }: Props) => {
  const { isLoggedIn, boards, currentBoard } = useStoreVars();

  const { dragResolver } = useBoards();

  const currentBoardName = currentBoard?.name;

  const [tasks, setTasks] = useState<Task[] | undefined>([]);

  useEffect(() => {
    const filteredTasks = boards
      .filter((board) => board.name === currentBoardName)[0]
      ?.tasks?.filter((task) => task.status === phase);

    setTasks(filteredTasks);
  }, [boards, currentBoardName, phase]);

  const [, dropRef] = useDrop(() => ({
    accept: "tile",
    drop: (item: DragSource) => {
      dragResolver({ ...item, destination: phase });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <>
      <div className="flex flex-col gap-6 w-72" ref={dropRef}>
        <h4 className="font-bold text-color-medium-gray text-sm tracking-widest flex gap-3 items-center">
          <div
            style={{ backgroundColor: color }}
            className={`bg-[${color}] w-3 h-3 rounded-full`}
          ></div>
          {`${phase?.toUpperCase()} (${tasks ? tasks?.length : 0})`}
        </h4>

        {tasks?.length ? (
          tasks?.map((task) => (
            <Tile
              key={isLoggedIn ? task._id : tasks.indexOf(task)}
              task={task}
              dragSource={{
                id: task._id,
                source: phase,
              }}
            />
          ))
        ) : (
          <div className="w-72 h-[70vh] border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl"></div>
        )}
      </div>
    </>
  );
};

export default TilesColumn;
