'use client'
import React, { useEffect, useState } from 'react'
import PoolContainer from './pool-container'
import Quarters from '../quarters-container'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import type { Pool } from '../../types/pool'
import type { GameType } from '../../types/event'
import PricePayouts from './price-payouts'
import { TiDelete } from "react-icons/ti";
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'

const PoolWrapper = ({ pool, session }: { pool: Pool, session: string | undefined }) => {
  const [dynamicInterval, setDynamicInterval] = useState(1000 * 60 * 5)
  const router = useRouter()
  const mutate = api.pool.deletePool.useMutation({
    onSuccess: () => {
      void router.push('/')
    }
  })

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
      awayName: data.away.name,
      homeName: data.home.name
    }
  }) : null
  const qtrs = quarters?.map((quarter) => { return { away: quarter.awayScore, home: quarter.homeScore, period: quarter.period } })
  const handleDelete = () => {
    mutate.mutate({ id: pool.id })
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className='flex flex-col items-center gap-28 justify-center'>
        <div className="flex flex-col items-center gap-4 justify-evenly p-4 rounded-md bg-slate-300 ring-2 dark:bg-slate-900 dark:ring-sky-700">
          <button
            className='relative left-[50%] -top-[20px] transition ease-in-out duration-300 hover:scale-125'
            onClick={handleDelete}>
            <TiDelete className='fill-red-600' size={48} />
          </button>
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
          <PricePayouts pricePerSquare={pool.pricePerSquare.toString()} payouts={pool.payouts.map(payout => payout.toString())} />
          {quarters?.length ? <Quarters quarters={quarters} /> : null}
        </div>
        {
          pool
          &&
          <PoolContainer
            {...pool}
            quarters={qtrs}
            session={session}
            away={{ id: data.away.id, name: data.away.name, logo: data.away.logo, score: data.awayScore, abbreviation: data.away.abbreviation }}
            home={{ id: data.home.id, name: data.home.name, logo: data.homeLogo, score: data.homeScore, abbreviation: data.home.abbreviation }} />
        }
      </div >
    </div>
  )
}

export default PoolWrapper