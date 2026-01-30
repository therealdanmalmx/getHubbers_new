import React from 'react'
import DropdownCountries from './DropdownCountries'

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="danmalmx" data-color="#ababab" data-emoji="☕" data-font="Poppins" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#FFDD00" ></script>


const Footer = () => {
  return (
    <div className='h-48 lg:h-36 flex flex-col-reverse lg:flex-row lg:justify-between gap-8 lg:gap-0  px-12 bg-navbar w-full bottom-0 items-center justify-center'>
      <div>
        <a href="https://www.buymeacoffee.com/danmalmx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{height: "40px", width: "152px"}} /></a>
      </div>
      <div className='hidden'></div>
      <DropdownCountries />
    </div>
  )
}

export default Footer