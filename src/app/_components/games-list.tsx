import React from 'react'
import GameTile from './game-tile'

type GameType = {
  $ref: string
}

const GamesList = ({ games, league }: { games: [GameType], league: string | null }) => {
  return (
    <div className='flex flex-col items-center gap-8 w-full'>
      {
        games.map((game, index) => {
          return <GameTile key={index} game={game} league={league} />
        })
      }
    </div>
  )
}

export default GamesList