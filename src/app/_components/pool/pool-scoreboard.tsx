import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TiDelete } from "react-icons/ti";
import { formatDate } from '~/app/utils/FormatDate'
import PricePayouts from './price-payouts'
import Quarters from './quarters-container'


type Props = {
  session: string | undefined
  userId: string
  poolId: string
  away: {
    logo: string
    name: string
    score: number | null | undefined
    abbreviation: string
  }
  home: {
    logo: string
    name: string
    score: number | null | undefined
    abbreviation: string
  }
  displayTime: string | null | undefined
  displayPeriod: string | null | undefined
  date: Date
  openDate: Date | null
  pricePerSquare: string
  payouts: string[]
  quarters: {
    awayScore: number
    homeScore: number
    period: number
    awayLogo: string
    homeLogo: string
    awayName: string
    homeName: string
  }[] | null

}

const PoolScoreboard = ({ session, userId, poolId, away, home, displayTime, displayPeriod, date, openDate, pricePerSquare, payouts, quarters }: Props) => {
  const formattedDate = formatDate(date)
  const poolOpen = openDate && Date.now() > Date.parse(openDate.toLocaleDateString())
  const openDisplayDate = openDate && formatDate(openDate)

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-md bg-slate-300 ring-2 dark:bg-slate-950 shadow-xl shadow-slate-700 dark:ring-sky-700 relative">
      {
        session === userId &&
        <Link
          className='absolute top-0 right-0 transition ease-in-out duration-300 hover:scale-125'
          href={`/delete-pool/${poolId}`}>
          <TiDelete className='fill-red-600' size={48} />
        </Link>
      }
      <div className="flex flex-col items-center gap-4">
        {
          !poolOpen && poolOpen !== null &&
          <div className='text-center text-2xl'>
            <p>Pool Opens</p>
            <p>{openDisplayDate}</p>
          </div>
        }
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Image src={away.logo} width={100} height={100} alt={`${away.name}'s logo`} priority />
            <p className='text-3xl'>{away.score}</p>
          </div>
          <p className='self-center text-5xl'>@</p>
          <div className="flex flex-col items-center">
            <Image src={home.logo} width={100} height={100} alt={`${home.name}'s logo`} priority />
            <p className='text-3xl'>{home.score}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <p>{displayTime}</p>
          <p>{displayPeriod}</p>
        </div>
        <p className='text-2xl'>{formattedDate}</p>
      </div>
      <PricePayouts pricePerSquare={pricePerSquare} payouts={payouts.map(payout => payout.toString())} />
      {quarters?.length ? <Quarters quarters={quarters} /> : null}
    </div>
  )
}

export default PoolScoreboard