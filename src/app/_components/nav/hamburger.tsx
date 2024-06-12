'use client'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from "react-icons/io5";
import type { HamburgerProps } from '~/app/types/nav';
import Link from 'next/link';

const Hamburger = ({ open, toggle }: HamburgerProps) => {
  return (
    <div className='flex lg:hidden justify-between p-2 items-center bg-opacity-0 dark:text-slate-200'>
      <Link href='/' className='text-2xl font-bold'>Pocket Pool</Link>
      <div>
        {open ? <IoClose className='fill-slate-950 dark:fill-slate-200' onClick={toggle} size={36} /> :
          <GiHamburgerMenu className='fill-slate-950 dark:fill-slate-200' onClick={toggle} size={36} />}
      </div>
    </div >
  )
}

export default Hamburger