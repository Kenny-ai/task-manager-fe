import React, { useRef } from "react";
import Phase from "./Phase";
import { PhaseType } from "@/utils/types";

interface Props {
  phaseList: PhaseType[];
  changePhaseList: (phaseList: PhaseType[]) => void;
}

const Phases = ({ phaseList, changePhaseList }: Props) => {
  const lastInputRef = useRef<null | HTMLDivElement>(null);

  const addNewPhase = () => {
    const lastPhaseId = phaseList[phaseList.length - 1]?._id || 0;
    // const _id = crypto.randomUUID();

    changePhaseList([
      ...phaseList,
      { _id: (lastPhaseId + 1).toString(), title: "" },
    ]);

    // auto focus on scroll
    lastInputRef.current!.scrollIntoView();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-color-medium-gray font-bold">
        Board Columns (Phases)
      </div>

      {/* <div className="max-h-[20rem] overflow-auto flex flex-col gap-4 mb-6"> */}
      <div
        className="flex flex-col gap-4 mb-6 max-h-32 overflow-auto scroll"
        id="phase-list"
      >
        {phaseList?.map((phase) => (
          <Phase
            phaseList={phaseList}
            changePhaseList={changePhaseList}
            key={phase._id}
            id={phase._id}
            title={phase.title}
          />
        ))}
        {/* ref to handle auto focus on scroll */}
        <div ref={lastInputRef} />
      </div>

      <button
        className="w-full text-color-purple font-bold duration-300 dark:bg-color-white bg-blue-100 hover:bg-blue-200 rounded-lg py-2 text-sm"
        onClick={addNewPhase}
        type="button"
      >
        + Add New Column (Phase)
      </button>
    </div>
  );
};

export default Phases;
