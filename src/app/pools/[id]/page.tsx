
import React from 'react'
import { api } from '~/trpc/server'
import { db } from '~/server/db'
import PoolContainer from '~/app/_components/pool'

export const generateStaticParams = async () => {
  const pools = await db.pool.findMany()
  return pools.map((pool) => ({
    params: { id: pool.id },
  }))
}

type Params = {
  params: {
    id: string
  }
}

const Pool = async ({ params }: Params) => {
  const { id } = params
  const pool = await api.pool.getPoolById.query({ id })

  return (
    <div className='flex flex-col items-center'>
      <p>{pool?.size}</p>
      <p>{pool?.userId}</p>
      {
        pool && <PoolContainer {...pool} />
      }
    </div>
  )
}

export default Pool