'use client'
import React, { useState } from 'react';
import Hamburger from './hamburger'
import HamburgerMenu from './hamburger-menu'
import Link from 'next/link'
import LoginButton from '../login-button'

const NavClient = ({ session }: { session: boolean }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(prev => !prev)

  return (
    <div>
      <div className='justify-end gap-4 border-b-2 border-b-black p-4 hidden lg:flex'>
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
      <HamburgerMenu open={open} toggle={toggle} session={session} />
    </div>
  )
}

export default NavClient