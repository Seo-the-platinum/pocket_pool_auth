'use client'
import React, { useState } from 'react'
import PoolContainer from './pool-container'
import Quarters from './quarters-container'
import PendingList from './pending-list'
import type { SoldSquare } from '../types/pool'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import type { Pool } from '../types/pool'
import type { GameType } from '../types/event'

const PoolWrapper = ({ pool, session }: { pool: Pool, session: string | undefined }) => {
  const [dynamicStaleTime, setDynamicStaleTime] = useState(1000 * 60 * 60)
  const { data } = useQuery(['pool', pool?.id], async () => {
    const data = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${pool?.event}`)
    const res = await data.json() as GameType
    const away = res?.boxscore.teams[0].team
    const home = res?.boxscore.teams[1].team
    const awayScore = res?.plays ? res.plays[res.plays?.length - 1]?.awayScore : null
    const homeScore = res?.plays ? res.plays[res.plays?.length - 1]?.homeScore : null
    const homeLogo = `https${home?.logo.slice(5)}`
    const awayLogo = `https${away?.logo.slice(5)}`
    const plays = res?.plays
    return {
      away,
      home,
      awayScore,
      homeScore,
      homeLogo,
      awayLogo,
      plays
    }
  }, { staleTime: dynamicStaleTime }
  )

  if (!pool || !data) {
    return <div>...Loading</div>
  }

  const lastPlay = data.plays[data.plays.length - 1]
  if (lastPlay?.type.text !== "End Game" && data.plays.length > 1) {
    setDynamicStaleTime(1000 * 60 * 5)
  }

  const quarters = data?.plays ? data.plays.filter((play) => {
    return play.type.text === "End Period"
  }).map((play) => {
    return {
      awayScore: play.awayScore % 10,
      homeScore: play.homeScore % 10,
      period: play.period.number,
      awayLogo: data.awayLogo,
      homeLogo: data.homeLogo,
      awayName: data.away.name,
      homeName: data.home.name
    }
  }) : null
  const purchasedSquares = pool?.squares.filter((square) => square.name)
  const qtrs = quarters?.map((quarter) => { return { away: quarter.awayScore, home: quarter.homeScore, period: quarter.period } })

  return (
    <div className="flex flex-col gap-10 items-center justify-center p-4">
      <div className='flex flex-col items-center gap-28 justify-center'>
        <div className="flex flex-col items-center gap-4 justify-evenly">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Image src={data.awayLogo} width={100} height={100} alt={`${data.away.name}'s logo`} />
              <p className='text-3xl'>{data.awayScore}</p>
            </div>
            <p className='self-center text-5xl'>@</p>
            <div className="flex flex-col items-center">
              <Image src={data.homeLogo} width={100} height={100} alt={`${data.home.name}'s logo`} />
              <p className='text-3xl'>{data.homeScore}</p>
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
            session={session}
            away={{ id: data.away.id, name: data.away.name, logo: data.away.logo, score: data.awayScore }}
            home={{ id: data.home.id, name: data.home.name, logo: data.homeLogo, score: data.homeScore }} />
        }
      </div >
      <PendingList squares={purchasedSquares as SoldSquare[]} />
    </div>
  )
}

export default PoolWrapper