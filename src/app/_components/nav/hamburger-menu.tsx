'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginButton from '../login-button'
import type { HamburgerMenuProps } from '~/app/types/nav'
import ThemeSwitcher from '../theme-switcher'

const HamburgerMenu = ({ open, toggle, session }: HamburgerMenuProps) => {
  const path = usePathname()
  return (
    <div className={`
      ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
      w-full grid transition-all ease-in-out duration-500 overflow-hidden
      z-10 items-start text-2xl lg:hidden px-2 dark:bg-slate-600 rounded-b-md bg-slate-200
      `}>
      <div className="flex flex-col w-full overflow-y-hidden">
        <ul className='flex flex-col text-2xl text-black w-full divide-y-2 divide-black h-[30vh] justify-evenly'>
          <li>
            <Link className={`${path === `/` ? 'text-sky-500' : 'text-black'}`} onClick={toggle} href='/'>Home</Link>
          </li>
          {session &&
            <>
              <li>
                <Link className={`${path === `/create` && 'text-sky-500'}`} onClick={toggle} href='/create'>Create</Link>
              </li>
              <li>
                <Link className={`${path.startsWith('/pools') && 'text-sky-500'}`} onClick={toggle} href='/pools'>Pools</Link>
              </li>
            </>
          }
          <li>
            <div className='flex justify-evenly pt-4'>
              <LoginButton session={session ? true : false} />
              <ThemeSwitcher />
            </div>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default HamburgerMenu