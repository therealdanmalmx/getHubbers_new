import DropdownCountries from './DropdownCountries'

const Footer = () => {
  return (
    <div className='h-48 lg:h-36 flex flex-col-reverse lg:flex-row lg:justify-between gap-8 lg:gap-0  px-12 bg-navbar absolute w-full bottom-0 items-center justify-center'>
      <div>
        <a href="https://www.buymeacoffee.com/danmalmx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{height: "40px", width: "152px"}} /></a>
      </div>
      <div className='hidden'></div>
      <DropdownCountries />
    </div>
  )
}

export default Footer