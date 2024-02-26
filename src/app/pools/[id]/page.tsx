
import React from 'react'
import { api } from '~/trpc/server'
import { db } from '~/server/db'
import Square from '~/app/_components/square'

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
    <div>
      <p>{pool?.size}</p>
      <p>{pool?.userId}</p>
      <div className="border-2 rounded border-black grid grid-cols-10 grid-rows-10">
        {
          pool?.squares.map((square) => {
            return (
              <Square key={square.id} {...square} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Pool