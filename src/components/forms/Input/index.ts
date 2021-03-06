import { DefaultInput as Default } from "./input";

export type InputProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
};

export const Input = { Default };
