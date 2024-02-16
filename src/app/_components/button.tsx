'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
const button = () => {
  return (
    <button onClick={() => signIn('Google')}>Sign in with Google</button>
  )
}

export default button