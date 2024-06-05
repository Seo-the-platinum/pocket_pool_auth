import React from 'react'
import CreatePoolButton from '~/app/_components/create-pool-button'
import CreateGameTile from '~/app/_components/create-game-tile'
import type { GameType } from '~/app/types/event'

const Create = async ({ params, searchParams }: { params: { id: string }, searchParams: { league: string | null } }) => {
  const game =
    await fetch(`https://site.api.espn.com/apis/site/v2/sports/${searchParams.league === 'nfl' ? 'football' : 'basketball'}/${searchParams.league}/summary?event=${params.id}`)
  const gameData = await game.json() as GameType
  const away = gameData.boxscore.teams[0].team
  const home = gameData.boxscore.teams[1].team
  const league = gameData.header.league.slug

  const date = gameData.header.competitions[0].date

  return (
    <div className='page items-center'>
      <CreateGameTile away={away} home={home} dateString={date} />
      <CreatePoolButton event={params.id} league={league} />
    </div>
  )
}

export default Create