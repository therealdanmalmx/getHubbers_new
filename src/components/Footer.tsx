import DropdownCountries from "./DropdownCountries";

const Footer = () => {
  return (
    <div className="bg-nordic_shade fixed bottom-0 flex h-40 w-full flex-col-reverse items-center justify-center gap-8 px-4 lg:h-28 lg:flex-row lg:justify-between lg:gap-0">
      <div>
        <a href="https://www.buymeacoffee.com/danmalmx" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            style={{ height: "40px", width: "152px" }}
          />
        </a>
      </div>
      <div className="hidden"></div>
      <DropdownCountries />
    </div>
  );
};

export default Footer;
