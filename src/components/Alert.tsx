import { useContext, useEffect } from "react";
import { AlertContext } from "../Context/AlertContext";

const Alert = () => {
  const { alertText, setShowAlert, showAlert } = useContext(AlertContext);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showAlert, setShowAlert]);

  const closeTheThing = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowAlert(false);
  };

  if (!showAlert) {
    return null;
  }

  return (
    <div className="flex h-14 w-full items-center justify-between bg-red-600 px-8 text-white">
      <div>{alertText}</div>
      <div className="cursor-pointer" onClick={closeTheThing}>
        X
      </div>
    </div>
  );
};

export default Alert;
