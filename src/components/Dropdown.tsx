import React, { useState } from "react";
import Icon from "./Icon";
import { useStoreVars } from "@/context/states";

interface Props {
  status: string;
  changeStatus: (str: string) => void;
}

const Dropdown = ({ status, changeStatus }: Props) => {
  const { currentBoard } = useStoreVars();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsDropdownOpen(() => !isDropdownOpen);
  };

  const handleStatusChange = (status: string) => {
    changeStatus(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`group w-full border rounded p-2 bg-gray-50 dark:bg-transparent cursor-pointer text-xs text-light-color-placeholder dark:text-dark-color-placeholder font-medium flex justify-between items-center ${
          isDropdownOpen
            ? `border-2 border-color-purple`
            : `border-light-lines hover:border-color-purple dark:border-dark-light-lines dark:hover:border-color-purple`
        }`}
        onClick={handleOpenDropdown}
      >
        <span className="select-none">{`${
          status.length ? status : `Select a status`
        } `}</span>
        {isDropdownOpen ? (
          <Icon
            src={`/assets/icon-chevron-up.svg`}
            alt="arrow-down"
            className="duration-200 select-none"
          />
        ) : (
          <Icon
            src={`/assets/icon-chevron-down.svg`}
            alt="arrow-down"
            className="group-hover:translate-y-1 duration-200 select-none"
          />
        )}
      </div>
      {isDropdownOpen && (
        <ul className="text-color-medium-gray text-xs py-2 bg-color-white dark:bg-dark-secondary-bg shadow-[0px_0px_3px_0px_rgba(0,0,0,0.52)] rounded flex flex-col absolute w-[26rem] top-12 max-h-24 overflow-auto">
          {currentBoard!.phases?.map((phase) => (
            <li
              className=" hover:bg-lighter-purple py-2 w-full pl-4 cursor-pointer select-none border-b border-light-lines dark:border-dark-light-lines"
              key={currentBoard!.phases?.indexOf(phase)}
              onClick={() => handleStatusChange(phase.title)}
            >
              {phase.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
