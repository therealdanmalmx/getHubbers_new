"use client";
import { FC, ReactNode, createContext, useState } from "react";

type AlertContextType = {
  alertText: string;
  showAlert: boolean;
  setAlertText: (msg: string) => void;
  setShowAlert: (close: boolean) => void;
};

export const AlertContext = createContext<AlertContextType>({
  alertText: "",
  showAlert: false,
  setAlertText: () => {},
  setShowAlert: () => {},
});

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alertText, setAlertText] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <AlertContext.Provider
      value={{
        alertText,
        showAlert,
        setAlertText,
        setShowAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
