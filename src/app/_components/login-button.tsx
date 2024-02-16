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
        session ? <button onClick={() => signOut()}> Signout </button> :
          <button onClick={() => signIn('Google')}>Sign in with Google</button>
      }
    </div>
  )
}

export default button