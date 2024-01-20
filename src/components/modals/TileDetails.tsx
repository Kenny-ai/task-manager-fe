"use client";
import React, { forwardRef, useState } from "react";
import Checkbox from "../Checkbox";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import { useBoards } from "@/hooks/useBoards";
import TaskOptions from "./TaskOptions";
import { ClickAwayListener } from "@mui/material";
import ModalLayout from "./ModalLayout";
import { useStoreVars } from "@/context/states";
import Loading from "../Loading";

type Ref = HTMLDivElement;

const TileDetails = forwardRef<Ref>(function TileDetails(props, ref) {
  const { isLoggedIn, currentTask, setIsTileDetailsOpen } = useStoreVars();

  const { title, description, subtasks, status } = currentTask;

  const { changeTaskStatus, numberOfCompleted, updateTask } = useBoards();

  const [isTaskOpsOpen, setIsTaskOpsOpen] = useState(false);

  const handleTaskOpschange = (state: boolean) => {
    setIsTaskOpsOpen(state);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      // console.log(currentTask);
      updateTask.mutate(currentTask);
    } else {
      setIsTileDetailsOpen(false);
    }
  };

  return (
    <div {...props} ref={ref}>
      <ModalLayout onSubmit={onSubmit}>
        <section className="flex justify-between items-center mb-6">
          <h3 className="text-lg md:text-xl font-bold text-color-purple dark:text-color-white">
            {title}
          </h3>

          <ClickAwayListener onClickAway={() => setIsTaskOpsOpen(false)}>
            <div>
              <button
                className="w-4 group parent hover:bg-dark-main-bg py-2"
                type="button"
                onClick={() => setIsTaskOpsOpen(true)}
              >
                <Icon
                  src="/assets/icon-vertical-ellipsis.svg"
                  alt="options"
                  className="duration-200 m-auto child"
                />
              </button>
              {isTaskOpsOpen ? (
                <TaskOptions changeIsOpen={handleTaskOpschange} />
              ) : null}
            </div>
          </ClickAwayListener>
        </section>

        <p className="text-[13px] font-semibold text-color-medium-gray mb-6">
          {description ? description : `No description`}
        </p>

        <div className="flex flex-col gap-2 mb-6">
          <p className="text-xs text-white font-bold">
            {`Subtasks (${numberOfCompleted(currentTask)} of ${
              subtasks?.length
            })`}
          </p>
          {subtasks!.length !== 0 ? (
            subtasks?.map((subtask) => (
              <Checkbox
                key={subtask._id}
                id={subtask._id}
                title={subtask.title}
                isCompleted={subtask.isCompleted}
              />
            ))
          ) : (
            <p className="text-xs text-color-medium-gray font-bold">
              No subtasks
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <p className="text-xs text-white font-bold">Current Status</p>

          <Dropdown status={status} changeStatus={changeTaskStatus} />
        </div>

        <button
          className="bg-color-purple w-full hover:bg-color-light-purple duration-300 text-color-white rounded-lg py-2 text-sm font-bold grid place-items-center"
          type="submit"
        >
          {updateTask.isLoading ? <Loading /> : `Save and Close`}
        </button>
      </ModalLayout>
    </div>
  );
});

export default TileDetails;
