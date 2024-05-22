import React from 'react'
import { api } from '~/trpc/server'
import PoolTile from '~/app/_components/pool/pool-tile'

const Pools = async () => {
  const pools = await api.pool.getUsersPools.query()
  return (
    <div className='page gap-8'>
      {
        pools.map((pool) => {
          return (
            <PoolTile key={pool.id} {...pool} />
          )
        })
      }
    </div>
  )
}

export default Pools