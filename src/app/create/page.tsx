'use client'
import React, { useState, useEffect } from 'react'
import CreatePoolButton from '../_components/create-pool-button'
import { useQuery } from '@tanstack/react-query'
import GamesList from '../_components/games-list'

const CreatePool = () => {
  const [league, setLeague] = useState<'nfl' | 'nba'>('nba')
  const { data } = useQuery(['events', league], async ({ queryKey, page = 1 }) => {
    const sport = league === 'nfl' ? 'football' : 'basketball'
    const response = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events?dates=20240306-20240419&page=${page}`)
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
        <option value={'nfl'}>NFL</option>
        <option value='nba'>NBA</option>
      </select>
      {
        data && <GamesList games={data.items} />
      }
      {/* <CreatePoolButton /> */}
    </div>
  )
}

export default CreatePool