import { DetailedHTMLProps, FormHTMLAttributes } from "react";

type FormProps = Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  "method"
>;

export const Form = ({ ...rest }: FormProps) => {
  return <form {...rest}></form>;
};
