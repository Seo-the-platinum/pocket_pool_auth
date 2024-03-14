'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import GamesList from '../_components/games-list'

const CreatePool = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
  const date = `${year}${month}${day}`
  const [league, setLeague] = useState<'nfl' | 'nba'>('nba')
  const { data } = useQuery(['events', league], async ({ queryKey, page = 1 }) => {
    const sport = league === 'nfl' ? 'football' : 'basketball'
    const response = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events?dates=${date}-20240419&page=${page}`)
    return response.json()
  }, {
    enabled: !!league,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.meta?.next) {
        return pages.length + 1
      }
      return undefined
    },
  }
  )
  return (
    <div>
      <label>Choose League:</label>
      <select id='league' name='league' onChange={(event) => setLeague(event?.target.value as 'nfl' | 'nba')}>
        <option value='nba'>NBA</option>
        <option value='nfl'>NFL</option>
      </select>
      {
        data && <GamesList games={data?.items} />
      }
    </div>
  )
}

export default CreatePool