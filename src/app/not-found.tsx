import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='page'>
      <h2>Whoops</h2>
      <p>Could not find the requested source</p>
      <Link href="/">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound