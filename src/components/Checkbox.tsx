import { useBoards } from "@/hooks/useBoards";
import React, { useEffect, useState } from "react";

interface Props {
  id: number;
  title: string;
  completed: boolean;
}

const Checkbox = ({ id, title, completed }: Props) => {
  const { toggleSubtaskCompleted } = useBoards();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(completed);
  }, [completed, setChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    toggleSubtaskCompleted(id);
  };

  return (
    <label
      className={`${
        checked ? `line-through !text-color-medium-gray ` : ``
      } w-full flex items-center gap-4 border border-light-lines dark:border-dark-light-lines rounded p-3 text-xs focus:outline-none bg-gray-100 dark:bg-transparent cursor-pointer text-color-black dark:text-color-white font-bold`}
      htmlFor={id.toString()}
    >
      <input
        type="checkbox"
        name={id.toString()}
        id={id.toString()}
        checked={checked}
        onChange={handleChange}
      />
      {title}
    </label>
  );
};

export default Checkbox;
