import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gethubberslogo from "../../public/logos/gethubberslogo_s.png";

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className='fixed top-0 w-full bg-navbar flex justify-between items-center py-2 px-8 h-40 max-h-32 z-10'>
      <div>
        <Link to='/' className='navbar'>
          <div>
            <h1 className='text-logo-text m-0 p-0 uppercase text-left'>
              GetHubbers
            </h1>
            <p className='text-logo-text m-0 p-0 uppercase text-left'>
              {/* {t("logoText")} */}
              Hello
            </p>
          </div>
        </Link>
      </div>
      <div>
        <Link to='/'>
          {" "}
          <img className='logo' src={gethubberslogo} alt="GetHubber's logo" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
