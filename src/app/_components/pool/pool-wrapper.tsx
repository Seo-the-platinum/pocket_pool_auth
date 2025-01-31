'use client'
import React, { useEffect, useState } from 'react'
import PoolContainer from './pool-container'
import PoolScoreboard from './pool-scoreboard'
import { useQuery } from '@tanstack/react-query'
import type { Pool } from '../../types/pool'
import type { GameType } from '../../types/event'


type Plays = {
  awayScore: number;
  homeScore: number;
  type: {
    text: string;
  };
  period: {
    number: number;
  };
  clock: {
    displayValue: string;
  };
}[] | undefined
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
    const awayScore = res?.plays ? res.plays[res.plays?.length - 1]?.awayScore : res?.scoringPlays ? res.scoringPlays[res.scoringPlays.length - 1]?.awayScore : null
    const homeScore = res?.plays ? res.plays[res.plays?.length - 1]?.homeScore : res?.scoringPlays ? res.scoringPlays[res.scoringPlays.length - 1]?.homeScore : null
    const homeLogo = `https${home?.logo.slice(5)}`
    const awayLogo = `https${away?.logo.slice(5)}`
    const plays = res?.plays ? res.plays : res.scoringPlays
    const drives = res?.drives
    const nflPlays = drives?.current ? [...drives.current?.plays, ...drives.previous.map(drive => drive?.plays).flat()] : drives && [...drives.previous.map(drive => drive.plays).flat()]
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
      drives,
      nflPlays,
      home,
      awayScore,
      homeScore,
      homeLogo,
      awayLogo,
      plays,
      date,
      formattedAway,
      formattedHome,
    }
  }, {
    refetchInterval: dynamicInterval,
  }
  )

  useEffect(() => {
    if (!pool || !data) return
    const lastPlay = data.plays?.length && data.plays?.length > 0 && data.plays[data.plays.length - 1]
    if (lastPlay && lastPlay?.type.text !== "End Game" && data?.plays?.length && data.plays.length > 1) {
      setDynamicInterval(1000 * 60)
    }

  }, [pool, data])

  if (!data || !pool) {
    return <div>...Loading</div>
  }
  // FOR NFL, SEARCH THROUGH DRIVES, CURRENT AND FILTER THE PLAYS TO FIND THE LAST PLAY OF THE QUARTER AND UPDATE.
  // NEED TO FIX SOON, MAYBE TURN INTO ANOTHER COMPONENT FOR NFL

  const nflPlays = data.nflPlays?.filter(play => {
    return play.type.text === "End of Half" || play.type.text === "End Period" || play.type.text === "End of Game"
  })
  const uniquePeriods = (arr: Plays) => {
    const uniquePeriodSet = new Set();
    const uniqueObjects: Plays = []
    arr?.forEach((play) => {
      if (!uniquePeriodSet.has(play.period.number)) {
        uniquePeriodSet.add(play.period.number)
        uniqueObjects.push(play)
      }
    })
    return uniqueObjects
  }

  const nflQuarters = uniquePeriods(nflPlays)?.map((play) => {
    return {
      awayScore: play.awayScore % 10,
      homeScore: play.homeScore % 10,
      period: play.period.number,
      awayLogo: data.awayLogo,
      homeLogo: data.homeLogo,
      awayName: data.away.abbreviation,
      homeName: data.home.abbreviation
    }
  })

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
  const nflQtrs = nflQuarters?.map((quarter) => { return { away: quarter.awayScore, home: quarter.homeScore, period: quarter.period } })
  const displayTime = data?.plays ? data.plays[data.plays.length - 1]?.clock.displayValue : null
  const displayPeriod = data?.plays ? data.plays[data.plays.length - 1]?.period.displayValue : null
  const nflDisplayTime = data?.nflPlays ? data.nflPlays[data.nflPlays.length - 1]?.clock.displayValue : null
  const nflDisplayPeriod = data?.nflPlays ? data.nflPlays[data.nflPlays.length - 1]?.period.number : null
  const timestamp = pool?.openDate && new Date(pool?.openDate)
  const poolOpen = timestamp && Date.now() > timestamp.getTime()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className='flex flex-col items-center gap-28 justify-center'>
        <PoolScoreboard
          poolId={pool.id}
          date={data.date}
          session={session}
          userId={pool.userId}
          displayTime={pool.league === 'nfl' ? nflDisplayTime : displayTime}
          away={{
            ...data.formattedAway,
            score: data.awayScore ? data.awayScore : 0
          }}
          home={{
            ...data.formattedHome,
            score: data.homeScore ? data.homeScore : 0
          }}
          pricePerSquare={pool.pricePerSquare}
          payouts={pool.payouts}
          quarters={pool.league === 'nfl' && nflQuarters ? nflQuarters : quarters}
          displayPeriod={pool.league === 'nfl' ? `Q${nflDisplayPeriod}` : displayPeriod}
          openDate={pool.openDate}
          poolOpen={poolOpen}
        />
        {
          pool
          &&
          <PoolContainer
            {...pool}
            quarters={pool.league === 'nfl' ? nflQtrs : qtrs}
            session={session}
            poolOpen={poolOpen}
            away={{ id: data.away.id, name: data.away.name, logo: data.away.logo, score: data.awayScore ? data.awayScore : 0, abbreviation: data.away.abbreviation }}
            home={{ id: data.home.id, name: data.home.name, logo: data.homeLogo, score: data.homeScore ? data.homeScore : 0, abbreviation: data.home.abbreviation }} />
        }
      </div >
    </div>
  )
}

export default PoolWrapper