import React from 'react'
import Link from 'next/link'

const PoolTile = ({ id, size, }: { id: string, size: number }) => {
  return (
    <Link className='flex rounded-md border-2 border-slate-950 bg-slate-200' href={`/pools/${id}`}>
      <p>{id}</p>
      <p>{size}</p>
    </Link>
  )
}

export default PoolTile