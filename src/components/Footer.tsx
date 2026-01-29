import React from 'react'
import DropdownCountries from './DropdownCountries'

const Footer = () => {
  return (
    <div className='h-36 py-4 flex flex-col lg:flex-row justify-start lg:justify-between px-12 bg-navbar w-full bottom-0 items-center content-center'>
        <div></div>
        <div></div>
        <DropdownCountries />
    </div>
  )
}

export default Footer