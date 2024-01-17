import React from "react";

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  id: string;
  name: string;
  className?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
}

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      id={props.id}
      name={props.name}
      className={`${props.className} w-full border border-light-lines dark:border-dark-light-lines rounded p-2 placeholder:text-light-color-placeholder dark:placeholder:text-dark-color-placeholder placeholder:text-xs text-xs focus:outline-none focus:!border-violet-500 bg-gray-50 dark:bg-transparent font-medium dark:text-color-white`}
      autoComplete={props.autoComplete}
      onChange={props.onChange}
      required={props.required}
      value={props.value}
    />
  );
};

export default Input;
