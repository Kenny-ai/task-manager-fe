import React from "react";
import Input from "./Input";
import Icon from "./Icon";
import { PhaseType } from "@/utils/types";

export interface PhaseProps {
  id: number;
  phaseList: PhaseType[];
  changePhaseList: (phaseList: PhaseType[]) => void;
  title: string;
}

const Phase = (props: PhaseProps) => {
  const { id, phaseList, changePhaseList, title } = props;

  const deletePhase = () => {
    changePhaseList(phaseList.filter((phaseItem) => phaseItem._id !== id));
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = [...phaseList];

    changePhaseList(
      arr.map((i) => {
        if (i._id === id) i.title = e.target.value;
        return i;
      })
    );
  };

  const currentPosition =
    phaseList.indexOf(phaseList.filter((phase) => phase._id === id)[0]) + 1;


  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor={`eb-add-phase ${id}`}
        className="text-xs font-medium text-color-medium-gray"
      >
        {currentPosition}.
      </label>
      <Input
        type="text"
        placeholder="e.g. Todo"
        id={`eb-add-phase ${id}`}
        name={`eb-add-phase ${id}`}
        onChange={handlePhaseChange}
        value={title}
        required
      />
      <button className="group" onClick={deletePhase}>
        <Icon
          src="/assets/icon-cross.svg"
          alt="delete phase"
          className="duration-200 icon-cross"
        />
      </button>
    </div>
  );
};

export default Phase;
