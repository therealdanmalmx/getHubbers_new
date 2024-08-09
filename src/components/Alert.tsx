import { useContext } from "react";
import { AlertContext } from "../Context/AlertContext";

const Alert = () => {
  const { alertText, setShowAlert, showAlert } = useContext(AlertContext);

  if (!showAlert) {
    return null;
  }

  setTimeout(() => {
    setShowAlert(false);
  }, 5000);

  return (
    <div className="flex h-14 w-full items-center justify-between bg-red-600 px-8 text-white">
      <div>{alertText}</div>
      <div className="cursor-pointer" onClick={() => setShowAlert(false)}>
        X
      </div>
    </div>
  );
};

export default Alert;
