"use client";
import React, { forwardRef, useState } from "react";
import Input from "../Input";
import Phases from "../Phases";
import { useBoards } from "@/hooks/useBoards";
import Loading from "../Loading";
import { initialPhase } from "@/utils/constants";
import { PhaseType } from "@/utils/types";
import Icon from "../Icon";
import ModalLayout from "./ModalLayout";
import { useStoreVars } from "@/context/states";

type Ref = HTMLDivElement;

const AddBoard = forwardRef<Ref>(function AddBoard(props, ref) {
  const { isLoggedIn, setIsAddBoardOpen } = useStoreVars();

  const { createBoard, createLocalBoard, checkDuplicateBoardName } =
    useBoards();

  const [name, setName] = useState("");

  const [phaseList, setPhaseList] = useState<PhaseType[]>([initialPhase]);

  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoggedIn) {
      const phases = phaseList.map((phase) => {
        return { title: phase.title };
      });
      createBoard.mutate({ name, phaseList: phases });
      // console.log({ name, phases });
    } else {
      if (!checkDuplicateBoardName(name)) {
        const _id = crypto.randomUUID();
        createLocalBoard({ _id, name, phaseList });
        setIsAddBoardOpen(false);
      } else {
        setError(`${name} already exists. Please choose another name!`);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const changePhaseList = (phaseList: PhaseType[]) => {
    setPhaseList(phaseList);
  };

  return (
    <div {...props} ref={ref}>
      <ModalLayout onSubmit={onSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-color-purple dark:text-color-white">
            Add New Board
          </h3>

          <button type="button" onClick={() => setIsAddBoardOpen(false)}>
            <Icon
              src="/assets/icon-cross.svg"
              alt="close"
              className="duration-200 icon-cross"
            />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="add-task-title"
              className="text-xs text-color-medium-gray font-bold"
            >
              Board Name
            </label>
            <Input
              type="text"
              placeholder="e.g. Web design"
              id="add-task-title"
              name="add-task-title"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="text-color-red text-xs font-bold">{error}</span>
          </div>

          <div className="">
            <Phases phaseList={phaseList} changePhaseList={changePhaseList} />
          </div>

          <button
            className="bg-color-purple w-full hover:bg-color-light-purple duration-300 text-color-white rounded-lg py-2 text-sm font-bold place-items-center grid"
            type="submit"
          >
            {createBoard.isLoading ? <Loading /> : `Create Board`}
          </button>
        </div>
      </ModalLayout>
    </div>
  );
});

export default AddBoard;
