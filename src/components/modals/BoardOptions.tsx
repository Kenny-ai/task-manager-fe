import React from "react";
import { useStoreVars } from "@/context/states";

interface Props {
  changeIsOpen: (arg0: boolean) => void;
  children?: React.ReactNode;
}

const BoardOptions = ({ changeIsOpen }: Props) => {
  const { setIsDeleteBoardOpen, setIsEditBoardOpen } = useStoreVars();

  return (
    <div className="text-sm w-48 py-4 bg-color-white dark:bg-dark-main-bg shadow-xl dark:shadow-[0px_10px_20px_rgba(54,78,126,0.25)] rounded-xl flex flex-col absolute right-5 top-24">
      <button
        className="text-color-medium-gray hover:bg-lighter-purple py-2 w-full"
        onClick={() => {
          changeIsOpen(false);
          setIsEditBoardOpen(true);
        }}
      >
        Edit Board
      </button>
      <button
        className="text-color-red hover:bg-lighter-purple py-2"
        onClick={() => {
          changeIsOpen(false);
          setIsDeleteBoardOpen(true);
        }}
      >
        Delete Board
      </button>
    </div>
  );
};

export default BoardOptions;
