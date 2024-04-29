'use client'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from "react-icons/io5";
import type { HamburgerProps } from '~/app/types/nav';

const Hamburger = ({ open, toggle }: HamburgerProps) => {
  return (
    <div className='flex lg:hidden justify-between bg-slate-600 px-2 items-center'>
      <h1 className='text-2xl font-bold'>Pocket Pool</h1>
      <div>
        {open ? <IoClose className='fill-slate-950' onClick={toggle} size={36} /> :
          <GiHamburgerMenu className='fill-slate-950' onClick={toggle} size={36} />}
      </div>
    </div>
  )
}

export default Hamburger