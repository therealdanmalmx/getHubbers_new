// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gethubberslogo from "../assets/logos/gethubberslogo_s.png";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed top-0 z-10 flex h-32 w-full items-center justify-center bg-navbar py-2 md:justify-between md:px-4">
      <div>
        <Link to="/" className="navbar">
          <div>
            <h1 className="m-0 p-0 text-center text-5xl font-bold uppercase text-logo-text md:text-left md:text-6xl">
              GetHubbers
            </h1>
            <p className="m-0 p-0 text-center text-xl uppercase text-logo-text md:text-left md:text-2xl">
              {t("logoText")}
            </p>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/">
          <img
            className="hidden h-20 w-full md:block"
            src={gethubberslogo}
            alt="GetHubber's logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
