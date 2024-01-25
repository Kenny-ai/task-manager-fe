"use client";
import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { Task } from "@/utils/types";
import { useStoreVars } from "@/context/states";

interface Props {
  phase: string;
  color?: string;
}

const TilesColumn = ({ phase, color }: Props) => {
  const { boards, currentBoard } = useStoreVars();

  const [tasks, setTasks] = useState<Task[] | undefined>([]);

  useEffect(() => {
    const filteredTasks = boards
      .filter((board) => board._id === currentBoard?._id)[0]
      ?.tasks?.filter((task) => task.status === phase);

    setTasks(filteredTasks);
  }, [boards, currentBoard, phase]);

  return (
    <>
      <div className="flex flex-col gap-6 w-72">
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
              key={task._id}
              task={task}
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
