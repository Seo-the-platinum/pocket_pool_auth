
import React from 'react'
import { api } from '~/trpc/server'
import { db } from '~/server/db'
import Image from 'next/image'
import PoolContainer from '~/app/_components/pool-container'
import { getServerAuthSession } from '~/server/auth'

// export const generateStaticParams = async () => {
//   const pools = await db.pool.findMany()
//   return pools.map((pool) => ({
//     params: { id: pool.id },
//   }))
// }

type Params = {
  params: {
    id: string
  }
}

type GameType = {
  boxscore: {
    teams: [
      {
        team: {
          name: string
          logo: string
        }
      },
      {
        team: {
          name: string
          logo: string
        }
      }
    ]
  },
  plays: [
    {
      awayScore: number
      homeScore: number
    }

  ]
}

const Pool = async ({ params }: Params) => {
  const { id } = params
  const session = await getServerAuthSession()
  const pool = await api.pool.getPoolById.query({ id })
  const data = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${pool?.event}`)
  const gameData = await data.json() as GameType
  const away = gameData?.boxscore.teams[0].team
  const home = gameData?.boxscore.teams[1].team
  const awayScore = gameData?.plays ? gameData.plays[gameData.plays?.length - 1]?.awayScore : null
  const homeScore = gameData?.plays ? gameData.plays[gameData.plays?.length - 1]?.homeScore : null
  const homeLogo = `https${home?.logo.slice(5)}`
  const awayLogo = `https${away?.logo.slice(5)}`

  return (
    <div className='flex flex-col items-center gap-10'>
      <p>{pool?.user.name}</p>
      <div className="flex items-center gap-4 justify-evenly">
        <div className="flex flex-col items-center">
          <Image src={awayLogo} width={100} height={100} alt={away?.name ? `${away.name}'s logo` : 'Away team logo'} />
          <p className='text-3xl'>{awayScore}</p>
        </div>
        <p className='self-center text-5xl'>@</p>
        <div className="flex flex-col items-center">
          <Image src={homeLogo} width={100} height={100} alt={home?.name ? `${home?.name}'s logo` : 'Home team logo'} />
          <p className='text-3xl'>{homeScore}</p>
        </div>
      </div>
      {
        pool && <PoolContainer {...pool} session={session?.user.id} />
      }
    </div >
  )
}

export default Pool