'use client'
import React, { useState, useEffect } from 'react'
import CreatePoolButton from '../_components/create-pool-button'
import { useQuery } from '@tanstack/react-query'

const CreatePool = () => {
  const [league, setLeague] = useState<'nfl' | 'nba'>('nba')
  const { data } = useQuery(['events', league], async () => {
    const sport = league === 'nfl' ? 'football' : 'basketball'
    const response = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events`)
    return response.json()
  }, { enabled: !!league }
  )
  console.log(data)
  return (
    <div>
      <label>Choose League:</label>
      <select id='league' name='league' onChange={(event) => setLeague(event?.target.value as 'nfl' | 'nba')}>
        <option value={'nfl'}>NFL</option>
        <option value='nba'>NBA</option>
      </select>

      {/* <CreatePoolButton /> */}
    </div>
  )
}

export default CreatePool