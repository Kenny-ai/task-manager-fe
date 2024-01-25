"use client";
import React, { forwardRef, useState } from "react";
import Input from "../Input";
import Subtasks from "../Subtasks";
import { SubtaskType } from "@/utils/types";
import { useBoards } from "@/hooks/useBoards";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
import { useStoreVars } from "@/context/states";
import { initialSubtask } from "@/utils/constants";
import Loading from "../Loading";
import { toast } from "react-toastify";

type Ref = HTMLDivElement;

const AddTask = forwardRef<Ref>(function AddTask(props, ref) {
  const { isLoggedIn, currentBoard, setBoards, setIsAddTaskOpen } =
    useStoreVars();

  const { createLocalTask, createTask } = useBoards();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState(currentBoard!.phaseList![0].title);

  const [subtasks, setSubtasks] = useState<SubtaskType[]>([initialSubtask]);

  const changeStatus = (str: string) => {
    setStatus(str);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      const formattedSubtasks = subtasks.map((subtask) => {
        return { title: subtask.title, isCompleted: subtask.isCompleted };
      });

      // console.log({ title, description, subtasks: formattedSubtasks, status });
      createTask.mutate({
        title,
        description,
        subtasks: formattedSubtasks,
        status,
      });
    } else {
      const _id = crypto.randomUUID();

      const task = { _id, title, description, subtasks, status };

      const newBoards = createLocalTask(task);

      setBoards(newBoards);

      setIsAddTaskOpen(false);
      toast.success("Task created");
    }
  };

  const changeSubtasks = (subtasks: SubtaskType[]) => {
    setSubtasks(subtasks);
  };

  return (
    <div {...props} ref={ref}>
      <form
        onSubmit={onSubmit}
        className="max-w-[30rem] w-full h-screen ms:h-fit bg-color-white dark:bg-dark-secondary-bg px-8 py-6 shadow-md rounded-lg ms:absolute ms:left-[calc(50vw-240px)] ms:top-[calc(50vh-350px)]"
      >
        {/* <ModalLayout> */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg md:text-xl font-bold text-color-purple dark:text-color-white">
            Add New Task
          </h3>

          <button type="button" onClick={() => setIsAddTaskOpen(false)}>
            <Icon
              src="/assets/icon-cross.svg"
              alt="close"
              className="duration-200 icon-cross"
            />
          </button>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="add-task-title"
              className="text-xs text-color-medium-gray font-bold"
            >
              Title
            </label>
            <Input
              type="text"
              placeholder="e.g. Take coffee break"
              id="add-task-title"
              name="add-task-title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="add-task-desc"
              className="text-xs text-color-medium-gray font-bold"
            >
              Description
            </label>
            <textarea
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
              id="add-task-desc"
              name="add-task-desc"
              className="w-full h-24 text-xs border border-light-lines dark:border-dark-light-lines rounded p-2 placeholder:text-light-color-placeholder dark:placeholder:text-dark-color-placeholder placeholder:text-xs focus:outline-none focus:!border-violet-500 bg-gray-50 dark:bg-transparent resize-none placeholder:leading-5 leading-5 font-medium"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Subtasks subtasks={subtasks} changeSubtasks={changeSubtasks} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-color-medium-gray font-bold">Status</p>

            <Dropdown status={status} changeStatus={changeStatus} />
          </div>

          <button
            className="bg-color-purple w-full hover:bg-color-light-purple duration-300 text-color-white rounded-lg py-2 text-sm font-bold grid place-items-center"
            type="submit"
          >
            {createTask.isLoading ? <Loading /> : `Create Task`}
          </button>
        </div>
        {/* </ModalLayout> */}
      </form>
    </div>
  );
});

export default AddTask;
