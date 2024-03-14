import React from 'react'
import { getServerAuthSession } from "~/server/auth";
import LoginButton from '../login-button'
import Link from 'next/link'

const Nav = async () => {
  const session = await getServerAuthSession()
  return (
    <div className='flex justify-end gap-4'>
      <Link href='/'>Home</Link>
      {session &&
        <><Link href='/create'>Create</Link>
          <Link href='/pools'>Pools</Link>
        </>
      }
      <LoginButton session={session ? true : false} />
    </div >
  )
}

export default Nav