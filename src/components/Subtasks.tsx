import React, { useRef } from "react";
import { SubtaskType } from "@/utils/types";
import Subtask from "./Subtask";

interface Props {
  subtasks: SubtaskType[];
  changeSubtasks: (subtasks: SubtaskType[]) => void;
}

const Subtasks = ({ subtasks, changeSubtasks }: Props) => {
  const lastInputRef = useRef<null | HTMLDivElement>(null);

  const addNewSubtask = () => {
    const lastSubtaskId = subtasks[subtasks.length - 1]?.id || 0;

    changeSubtasks([
      ...subtasks,
      { id: lastSubtaskId + 1, title: "", completed: false },
    ]);

    // auto focus on scroll
    lastInputRef.current!.scrollIntoView();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-color-medium-gray font-bold">Subtasks</div>

      <div>
        <div className="flex flex-col gap-4 mb-6 max-h-32 overflow-auto scroll">
          {subtasks.length !== 0 ? (
            subtasks.map((subtask) => (
              <Subtask
                key={subtask.id}
                id={subtask.id}
                subtasks={subtasks}
                changeSubtasks={changeSubtasks}
                title={subtask.title}
              />
            ))
          ) : (
            <p className="text-xs font-medium text-light-color-placeholder dark:text-dark-color-placeholder">
              No subtasks
            </p>
          )}
          {/* ref to handle auto focus on scroll */}
          <div ref={lastInputRef} />
        </div>

        <button
          className="w-full text-color-purple font-bold duration-300 dark:bg-color-white bg-blue-100 hover:bg-blue-200 rounded-lg py-2 text-sm"
          onClick={addNewSubtask}
          type="button"
        >
          + Add Subtask
        </button>
      </div>
    </div>
  );
};

export default Subtasks;
