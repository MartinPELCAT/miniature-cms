import { Method } from "axios";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";

type FormProps = Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  "method"
> & { method: Method };

export const Form = ({ method, ...rest }: FormProps) => {
  return <form {...rest} method={method}></form>;
};
