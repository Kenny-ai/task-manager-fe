import React from "react";
import Input from "./Input";
import Icon from "./Icon";
import { SubtaskType } from "@/utils/types";

interface Props {
  id?: number;
  subtasks: SubtaskType[];
  changeSubtasks: (subtasks: SubtaskType[]) => void;
  title: string;
}

const Subtask = (props: Props) => {
  const { id, subtasks, changeSubtasks, title } = props;

  const deleteSubtask = () => {
    changeSubtasks(subtasks.filter((subtask) => subtask._id !== id));
  };

  const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = [...subtasks];

    changeSubtasks(
      arr.map((i) => {
        if (i._id === id) i.title = e.target.value;
        return i;
      })
    );
  };

  const currentPosition =
    subtasks.indexOf(subtasks.filter((subtask) => subtask._id === id)[0]) + 1;

  return (
    <div className="flex items-center gap-4">
      <label
        className="text-xs font-medium text-color-medium-gray"
        htmlFor={`add-task-subtasks ${id}`}
      >
        {currentPosition}.
      </label>
      <Input
        type="text"
        placeholder="e.g. Make coffee"
        id={`add-task-subtasks ${id}`}
        name={`add-task-subtasks ${id}`}
        onChange={handleSubtaskChange}
        value={title}
        required
      />
      <button className="" onClick={deleteSubtask}>
        <Icon
          src="/assets/icon-cross.svg"
          alt="delete subtask"
          className="duration-200 icon-cross"
        />
      </button>
    </div>
  );
};

export default Subtask;
