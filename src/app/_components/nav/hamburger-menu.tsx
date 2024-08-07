'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginButton from './login-button'
import type { HamburgerMenuProps } from '~/app/types/nav'
import ThemeSwitcher from './theme-switcher'

const HamburgerMenu = ({ open, toggle, session }: HamburgerMenuProps) => {
  const path = usePathname()

  return (
    <div className={`
      ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
      w-full grid transition-all ease-in-out duration-500 overflow-hidden
      z-10 items-start text-2xl lg:hidden px-2 dark:bg-slate-950 rounded-b-md bg-slate-200
      `}
    >
      <div className="flex flex-col w-full overflow-y-hidden">
        <ul className='flex flex-col text-2xl text-black w-full h-[40vh] justify-between dark:text-slate-200 py-4'>
          <li className='w-full border-b-2 border-slate-800 dark:border-sky-700 shadow-md shadow-sky-500/75'>
            <Link className={`${path === `/` && 'text-sky-500'}`} onClick={toggle} href='/'>Home</Link>
          </li>
          {session &&
            <>
              <li className='w-full border-b-2 border-slate-800 dark:border-sky-700 shadow-md shadow-sky-500'>
                <Link className={`${path === `/create` && 'text-sky-500 '}`} onClick={toggle} href='/create'>Create</Link>
              </li>
              <li className='w-full border-b-2 border-slate-800 dark:border-sky-700 shadow-md shadow-sky-500/75'>
                <Link className={`${path.startsWith('/pools') && 'text-sky-500'}`} onClick={toggle} href='/pools'>Pools</Link>
              </li>
            </>
          }
          <li>
            <div className='flex justify-evenly pt-4'>
              <LoginButton session={session ? true : false} />
              <ThemeSwitcher toggle={toggle} />
            </div>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default HamburgerMenu