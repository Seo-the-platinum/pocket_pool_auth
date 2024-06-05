'use client'
import React, { useState, useRef, useEffect } from 'react';
import Hamburger from './hamburger'
import HamburgerMenu from './hamburger-menu'
import Link from 'next/link'
import LoginButton from '../login-button'

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
      <div className='justify-end gap-4 rounded-b-md p-4 hidden lg:flex'>
        <Link href='/'>Home</Link>
        {session &&
          <>
            <Link href='/create'>Create</Link>
            <Link href='/pools'>Pools</Link>
          </>
        }
        <LoginButton session={session ? true : false} />
      </div >
      <Hamburger open={open} toggle={toggle} />
      <div ref={ref}>
        <HamburgerMenu open={open} toggle={toggle} session={session} />
      </div>
    </div>
  )
}

export default NavClient