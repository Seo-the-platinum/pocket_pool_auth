import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import NavClient from './nav-client'

const Nav = async () => {
  const session = await getServerAuthSession()
  return (
    <div className='flex flex-col w-full border-b-[1px] border-b-gray-300 justify-between bg-slate-50 z-20 absolute lg:static'>
      <NavClient session={session ? true : false} />
    </div>
  )
}

export default Nav