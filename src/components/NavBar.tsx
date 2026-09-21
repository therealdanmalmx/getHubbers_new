// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gethubberslogo from "../assets/logos/gethubberslogo.png";

const NavBar = () => {
  return (
    <div className="bg-nordic z-10 flex h-16 w-full items-center justify-center md:justify-between">
      <div>
        <Link to="/" className="navbar">
          <div>
            <h1 className="m-0 p-0 text-center text-5xl font-bold uppercase text-logo-text md:text-left md:text-4xl">
              <span>Get</span>
              <span className="text-nordic_salmon">Hubbers</span>
            </h1>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/">
          <img
            className="hidden size-8 w-full md:block"
            src={gethubberslogo}
            alt="GetHubber's logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
