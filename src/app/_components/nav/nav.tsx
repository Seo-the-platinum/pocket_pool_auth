import React from 'react'
import { getServerAuthSession } from "~/server/auth";
import LoginButton from '../login-button'

const Nav = async () => {
  const session = await getServerAuthSession()
  return (
    <div className='flex justify-end gap-4'>
      <a href='/'>Home</a>
      {session &&
        <a href='/create'>Create</a>
      }
      <LoginButton session={session ? true : false} />
    </div>
  )
}

export default Nav