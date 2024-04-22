import React from 'react'
import { api } from '~/trpc/server'
import Image from 'next/image'
import PoolContainer from '~/app/_components/pool-container'
import { getServerAuthSession } from '~/server/auth'
import Quarters from '~/app/_components/quarters-container'
import PendingList from '~/app/_components/pending-list'
import type { SoldSquare } from '~/app/types/pool'
import type { GameType } from '~/app/types/event'

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
  const data = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${pool?.event}`)
  const gameData = await data.json() as GameType
  const away = gameData?.boxscore.teams[0].team
  const home = gameData?.boxscore.teams[1].team
  const awayScore = gameData?.plays ? gameData.plays[gameData.plays?.length - 1]?.awayScore : null
  const homeScore = gameData?.plays ? gameData.plays[gameData.plays?.length - 1]?.homeScore : null
  const homeLogo = `https${home?.logo.slice(5)}`
  const awayLogo = `https${away?.logo.slice(5)}`

  if (!pool) {
    return <div>...Loading</div>
  }

  const quarters = gameData.plays ? gameData.plays.filter((play) => {
    return play.type.text === "End Period"
  }).map((play) => {
    return {
      awayScore: play.awayScore % 10,
      homeScore: play.homeScore % 10,
      period: play.period.number,
      awayLogo,
      homeLogo,
      awayName: away.name,
      homeName: home.name
    }
  }) : null
  const purchasedSquares = pool.squares.filter((square) => square.name)
  const qtrs = quarters?.map((quarter) => { return { away: quarter.awayScore, home: quarter.homeScore, period: quarter.period } })
  return (
    <div className="flex flex-col gap-10 items-center justify-center p-4">
      <div className='flex flex-col items-center gap-28 justify-center'>
        <div className="flex flex-col items-center gap-4 justify-evenly">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Image src={awayLogo} width={100} height={100} alt={`${away.name}'s logo`} />
              <p className='text-3xl'>{awayScore}</p>
            </div>
            <p className='self-center text-5xl'>@</p>
            <div className="flex flex-col items-center">
              <Image src={homeLogo} width={100} height={100} alt={`${home.name}'s logo`} />
              <p className='text-3xl'>{homeScore}</p>
            </div>
          </div>

          {quarters?.length ? <Quarters quarters={quarters} /> : null}
        </div>
        {
          pool
          &&
          <PoolContainer
            {...pool}
            quarters={qtrs}
            session={session?.user.id}
            away={{ id: away.id, name: away.name, logo: away.logo, score: awayScore }}
            home={{ id: home.id, name: home.name, logo: home.logo, score: homeScore }} />
        }
      </div >
      <PendingList squares={purchasedSquares as SoldSquare[]} />
    </div>
  )
}

export default Pool