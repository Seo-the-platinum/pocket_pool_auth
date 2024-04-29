'use client'

import React from 'react'
import { signIn, signOut } from 'next-auth/react'

type Props = {
  session: boolean;
}
const button = ({ session }: Props) => {
  return (
    <div>
      {
        session ? <button className='btn' onClick={() => signOut()}> Logout </button> :
          <button className='btn' onClick={() => signIn('Google')}>Login with Google</button>
      }
    </div>
  )
}

export default button