import React from "react";
import TilesColumn from "./TilesColumn";
import { useStoreVars } from "@/context/states";

const colors = [
  "#ACECA1",
  "#EF798A",
  "#A3C3D9",
  "#AE76A6",
  "#FFD6E0",
  "#C1FBA4",
  "#7D82B8",
  "#D6E681",
];

const BoardView = () => {
  const { boards, currentBoard, setIsEditBoardOpen } = useStoreVars();

  const currentBoardId = currentBoard?._id;

  return currentBoard ? (
    <div className="flex gap-8 p-8 mt-28 w-fit">
      <>
        {boards
          .filter((board) => board._id === currentBoardId)[0]
          ?.phaseList?.map((phase, index) => (
            <TilesColumn
              key={index}
              phase={phase.title}
              color={colors[index]}
            />
          ))}
        <div
          className={`h-[70vh] dark:bg-dark-color-gradient flex justify-center bg-light-color-gradient shadow-md items-center rounded-xl text-color-medium-gray hover:text-color-light-purple font-bold text-2xl cursor-pointer mt-10`}
          onClick={() => setIsEditBoardOpen(true)}
        >
          <button className="w-72">+ New Column</button>
        </div>
      </>
    </div>
  ) : (
    <div className="flex justify-center items-center h-[calc(100vh-7rem)] w-full mt-28">
      <p className="text-color-medium-gray font-bold">
        Click on a board to view its details
      </p>
    </div>
  );
};

export default BoardView;
