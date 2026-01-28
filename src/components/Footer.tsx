import React from 'react'
import DropdownCountries from './DropdownCountries'

const Footer = () => {
  return (
    <div className='h-36 flex flex-col lg:flex-row justify-start lg:justify-between px-12 bg-navbar w-full fixed bottom-0 items-center content-center'>
        <div>Hello</div>
        <div>NO</div>
        <DropdownCountries />
    </div>
  )
}

export default Footer