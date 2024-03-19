import React from 'react'
import GameTile from './game-tile'

type GameType = {
  $ref: string
}

const GamesList = ({ games }: { games: [GameType] }) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      {
        games.map((game, index) => {
          return <GameTile key={index} game={game} />
        })
      }
    </div>
  )
}

export default GamesList