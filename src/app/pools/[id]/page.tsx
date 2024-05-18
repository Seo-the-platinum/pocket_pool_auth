import React from 'react'
import { api } from '~/trpc/server'
import { getServerAuthSession } from '~/server/auth'
import PoolWrapper from '~/app/_components/pool/pool-wrapper'

const Pool = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const session = await getServerAuthSession()
  const pool = await api.pool.getPoolById.query({ id })
  return (
    <div className="page pb-8">
      <PoolWrapper pool={pool} session={session?.user.id} />
    </div>
  )
}

export default Pool