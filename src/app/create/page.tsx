'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import GamesList from '../_components/games-list'
import { useSearchParams, useRouter } from 'next/navigation'
type EventTypes = {
  items: [
    game: {
      $ref: string
    }
  ]
  pageCount: number
}
const CreatePool = () => {
  // TODO: UPDATE DATE SO THAT GAMES THAT HAVE STARTED ARE NOT INCLUDED IN THE LIST
  const searchParams = useSearchParams()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
  const date = `${year}${month}${day}`

  const league = searchParams.get('league')
  const { data }: UseQueryResult<EventTypes> = useQuery(['events', league, page], async () => {
    const sport = league === 'nfl' ? 'football' : 'basketball'
    const response = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events?dates=${date}-20241230&page=${page}`)
    return response.json()
  }, {
    enabled: !!league,
  }
  )
  const handleOptionClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') return
    router.push(`/create?league=${e.target.value}`)
  }
  return (
    <div className='page gap-8 min-h-screen justify-between'>
      <div className="flex flex-col">
        <label>Choose League:</label>
        <select id='league' name='league' onChange={(e) => handleOptionClick(e)} defaultValue=''>
          <option value='' disabled>
            Please select a league
          </option>
          <option value='nfl'>
            NFL
          </option>
          <option value='nba'>
            NBA
          </option>
        </select>
      </div>
      {
        data && <GamesList games={data?.items} league={league} />
      }
      <div className="flex w-full justify-evenly h-8">
        {
          data && Array.from({ length: data.pageCount }).map((_, i) => (
            <button className={`${i + 1 === page ? 'bg-slate-400 text-blue-500' : 'bg-slate-200'} rounded-full size-6`} key={i} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))
        }
      </div>
    </div>
  )
}

export default CreatePool