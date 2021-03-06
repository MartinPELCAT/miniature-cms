import { createContext, FC } from "react";

export const InstallerContext = createContext(undefined);

export const InstallerContextProvider: FC = ({ children }) => {
  return (
    <InstallerContext.Provider value={undefined}>
      {children}
    </InstallerContext.Provider>
  );
};
