import { FC } from "react";
import { Header } from "src/components/header";

export const AdminLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />

      <div>{children}</div>
    </div>
  );
};
