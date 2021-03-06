import React from "react";
import { ButtonProps } from ".";

export const DefaultButton = ({ type = "submit", label }: ButtonProps) => {
  return (
    <button type={type} className="bg-gray-700 text-white p-2 w-full text-center rounded-md">
      {label}
    </button>
  );
};
