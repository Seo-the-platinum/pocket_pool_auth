'use client'
import React, { useEffect, useState } from 'react'
import PoolContainer from './pool-container'
import PoolScoreboard from './pool-scoreboard'
import { useQuery } from '@tanstack/react-query'
import type { Pool } from '../../types/pool'
import type { GameType } from '../../types/event'

// TODO: COME BACK TO THIS AND SEE IF WE CAN CLEAN UP THE CODE
const PoolWrapper = ({ pool, session }: { pool: Pool, session: string | undefined }) => {
  const [dynamicInterval, setDynamicInterval] = useState(1000 * 60 * 5)

  const { data } = useQuery(['pool', pool?.id], async () => {

    const data = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${pool?.league === 'nfl' ? 'football'
      : 'basketball'}/${pool?.league}/summary?event=${pool?.event}`)
    const res = await data.json() as GameType
    const date = res.header?.competitions[0].date
    const away = res?.boxscore.teams[0].team
    const home = res?.boxscore.teams[1].team
    const awayScore = res?.plays ? res.plays[res.plays?.length - 1]?.awayScore : null
    const homeScore = res?.plays ? res.plays[res.plays?.length - 1]?.homeScore : null
    const homeLogo = `https${home?.logo.slice(5)}`
    const awayLogo = `https${away?.logo.slice(5)}`
    const plays = res?.plays
    const formattedAway = {
      ...away,
      logo: awayLogo
    }
    const formattedHome = {
      ...home,
      logo: homeLogo
    }
    return {
      away,
      home,
      awayScore,
      homeScore,
      homeLogo,
      awayLogo,
      plays,
      date,
      formattedAway,
      formattedHome
    }
  }, {
    refetchInterval: dynamicInterval,
  }
  )

  useEffect(() => {
    if (!pool || !data) return
    const lastPlay = data.plays?.length > 0 && data.plays[data.plays.length - 1]
    if (lastPlay && lastPlay?.type.text !== "End Game" && data.plays.length > 1) {
      setDynamicInterval(1000 * 60)
    }

  }, [pool, data])

  if (!data || !pool) {
    return <div>...Loading</div>
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
      awayName: data.away.abbreviation,
      homeName: data.home.abbreviation
    }
  }) : null

  const qtrs = quarters?.map((quarter) => { return { away: quarter.awayScore, home: quarter.homeScore, period: quarter.period } })
  const displayTime = data?.plays ? data.plays[data.plays.length - 1]?.clock.displayValue : null
  const displayPeriod = data?.plays ? data.plays[data.plays.length - 1]?.period.displayValue : null
  const poolOpen = pool?.openDate && Date.now() > Date.parse(pool.openDate.toLocaleDateString())
  return (
    <div className="flex flex-col items-center justify-center">
      <div className='flex flex-col items-center gap-28 justify-center'>
        <PoolScoreboard
          poolId={pool.id}
          date={data.date}
          session={session}
          userId={pool.userId}
          displayTime={displayTime}
          away={{
            ...data.formattedAway,
            score: data.awayScore
          }}
          home={{
            ...data.formattedHome,
            score: data.homeScore
          }}
          pricePerSquare={pool.pricePerSquare}
          payouts={pool.payouts}
          quarters={quarters}
          displayPeriod={displayPeriod}
          openDate={pool.openDate}
        />
        {
          pool
          &&
          <PoolContainer
            {...pool}
            quarters={qtrs}
            session={session}
            poolOpen={poolOpen}
            away={{ id: data.away.id, name: data.away.name, logo: data.away.logo, score: data.awayScore, abbreviation: data.away.abbreviation }}
            home={{ id: data.home.id, name: data.home.name, logo: data.homeLogo, score: data.homeScore, abbreviation: data.home.abbreviation }} />
        }
      </div >
    </div>
  )
}

export default PoolWrapper