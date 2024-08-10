import { useContext, useEffect } from "react";
import { AlertContext } from "../Context/AlertContext";
import CloseIcon from "~icons/uiw/circle-close";

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
    <div className="flex h-14 w-full items-center justify-between bg-red-600 px-6 text-white transition duration-1000 ease-in-out md:justify-center">
      <div className="md:flex-1 md:text-center">{alertText}</div>
      <div className="cursor-pointer md:mx-auto" onClick={closeTheThing}>
        <CloseIcon className="size-6 transition duration-300 hover:size-5" />
      </div>
    </div>
  );
};

export default Alert;
