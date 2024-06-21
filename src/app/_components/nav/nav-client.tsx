'use client'
import React, { useState, useRef, useEffect } from 'react';
import Hamburger from './hamburger'
import HamburgerMenu from './hamburger-menu'
import Link from 'next/link'
import LoginButton from './login-button'
import ThemeSwitcher from './theme-switcher'

const NavClient = ({ session }: { session: boolean }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(prev => !prev)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node) && open) {
        toggle()
      }
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <div>
      <div className='justify-between hidden px-8 py-2 text-xl items-end lg:flex xl:px-16 2xl:px-32'>
        <div className="flex items-end">
          <Link className='nav-link text-3xl font-bold' href='/'>Pocket Pool</Link>
        </div>
        <div className="flex gap-8 items-end">
          <Link className='nav-link'
            href='/'>Home</Link>
          {session &&
            <>
              <Link className='nav-link' href='/create'>Create</Link>
              <Link className='nav-link' href='/pools'>Pools</Link>
            </>
          }
          <LoginButton session={session ? true : false} />
          <ThemeSwitcher toggle={toggle} />
        </div>
      </div >
      <Hamburger open={open} toggle={toggle} />
      <div ref={ref}>
        <HamburgerMenu open={open} toggle={toggle} session={session} />
      </div>
    </div>
  )
}

export default NavClient