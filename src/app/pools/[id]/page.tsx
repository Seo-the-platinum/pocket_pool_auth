
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

  //EXAMPLE OF GETTING ALL NBA GAMES FOR THE DAY AND TAKING THE LAST ONE AND GETTING THE STATUS
  // const events = await fetch('https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/events')
  // const eventsData = await events.json()
  // const event = await fetch(`${eventsData.items[8].$ref}/event`)
  // const eventData = await event.json()
  // console.log('here are the teams', eventData.competitions[0].status)
  return (
    < div className='flex flex-col items-center' >
      <p>{pool?.user.name}</p>
      {
        pool && <PoolContainer {...pool} />
      }
    </div >
  )
}

export default Pool