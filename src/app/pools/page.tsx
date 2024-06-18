import React from 'react'
import { api } from '~/trpc/server'
import PoolsContainer from '~/app/_components/pool/pools-container'

const Pools = async () => {
  return (
    <div className='page gap-16 items-center'>
      <PoolsContainer />
    </div>
  )
}

export default Pools