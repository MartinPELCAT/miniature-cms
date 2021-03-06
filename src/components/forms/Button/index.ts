import { DefaultButton as Default } from "./Default";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  label: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export const Button = { Default };
