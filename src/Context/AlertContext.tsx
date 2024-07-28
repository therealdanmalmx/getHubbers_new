"use client";
import { FC, ReactNode, createContext, useState } from "react";

type AlertContextType = {
  alert: string;
  setAlert: (msg: string) => void;
};

export const AlertContext = createContext<AlertContextType>({
  alert: "",
  setAlert: () => {},
});
const [alert, setAlert] = useState("");

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
