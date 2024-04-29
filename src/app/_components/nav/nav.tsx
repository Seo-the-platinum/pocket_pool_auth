import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import NavClient from './nav-client'

const Nav = async () => {
  const session = await getServerAuthSession()
  return (
    <div className='flex flex-col w-full border-b-[1px] rounded-b-md border-b-slate-800 justify-between z-20 absolute lg:static'>
      <NavClient session={session ? true : false} />
    </div>
  )
}

export default Nav