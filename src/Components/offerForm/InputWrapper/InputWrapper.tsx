import React from "react";

interface Props {
  type: string;
  value: string;
  handleChangeInformations: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
}

const InputWrapper = ({
  handleChangeInformations,
  type,
  value,
  label,
}: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input onChange={handleChangeInformations} type={type} name={value} />
    </div>
  );
};

export default InputWrapper;
