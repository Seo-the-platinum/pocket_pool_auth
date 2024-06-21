'use client'
import React from 'react'
import { api } from '~/trpc/react'
import PoolTile from '~/app/_components/pool/pool-tile'

const PoolsContainer = () => {
  const { data } = api.pool.getUsersPools.useQuery()
  return (
    <div className='flex flex-col gap-16 items-center w-full'>
      {
        data?.map((pool) => {
          return (
            <PoolTile key={pool.id} {...pool} />
          )
        })
      }
    </div>
  )
}

export default PoolsContainer