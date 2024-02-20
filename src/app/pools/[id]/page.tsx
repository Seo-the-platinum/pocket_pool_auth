
import React from 'react'
import { api } from '~/trpc/server'
import { db } from '~/server/db'

export const generateStaticParams = async () => {
  const pools = await db.pool.findMany()
  return pools.map((pool) => ({
    params: { id: pool.id },
  }))
}

const Pool = async ({ params }) => {
  const { id } = params
  const pool = await api.pool.getPoolById.query({ id })
  console.log('heres the pool', pool)
  return (
    <div>
      <p>{pool.size}</p>
      <p>{pool.userId}</p>
    </div>
  )
}

export default Pool