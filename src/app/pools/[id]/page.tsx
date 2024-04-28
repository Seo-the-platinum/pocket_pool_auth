import React from 'react'
import { api } from '~/trpc/server'
import { getServerAuthSession } from '~/server/auth'
import PoolWrapper from '~/app/_components/pool/pool-wrapper'

//TODO: Implement static generation, not working on production
// export const generateStaticParams = async () => {
//   const pools = await db.pool.findMany()
//   return pools.map((pool) => ({
//     params: { id: pool.id },
//   }))
// }

const Pool = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const session = await getServerAuthSession()
  const pool = await api.pool.getPoolById.query({ id })
  return (
    <div className="flex flex-col gap-10 items-center justify-center p-4 pt-16 bg-gradient-to-br from-slate-500 to-indigo-950 to-85%">
      <PoolWrapper pool={pool} session={session?.user.id} />
    </div>
  )
}

export default Pool