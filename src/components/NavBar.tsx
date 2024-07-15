// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gethubberslogo from "../../public/logos/gethubberslogo_s.png";

const NavBar = () => {
  //   const { t } = useTranslation();
  return (
    <div className="fixed top-0 z-10 flex h-40 max-h-32 w-full items-center justify-between bg-navbar px-8 py-2">
      <div>
        <Link to="/" className="navbar">
          <div>
            <h1 className="m-0 p-0 text-left text-6xl font-bold uppercase text-logo-text">
              GetHubbers
            </h1>
            <p className="m-0 p-0 text-left text-2xl uppercase text-logo-text">
              {/* {t("logoText")} */}
              Find Coders Where Coders Are
            </p>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/">
          <img
            className="h-20 w-full"
            src={gethubberslogo}
            alt="GetHubber's logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
