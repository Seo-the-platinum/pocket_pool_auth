'use client'
import React, { Suspense } from 'react'
import { api } from '~/trpc/react'
import PoolTile from '~/app/_components/pool/pool-tile'
import Skeleton from '~/app/_components/pool/skeleton'

const PoolsContainer = () => {
  const { data } = api.pool.getUsersPools.useQuery()
  return (
    <div className='flex flex-col gap-16 items-center w-full'>
      <Suspense fallback={<Skeleton />}>
        {
          data?.map((pool) => {
            return (
              <PoolTile key={pool.id} {...pool} />
            )
          })
        }
      </Suspense>
    </div >
  )
}

export default PoolsContainer