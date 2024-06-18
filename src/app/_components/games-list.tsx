import React, { Suspense } from 'react'
import GameTile from './game-tile'

const GamesList = ({ games, league }: { games: [{ $ref: string }], league: string | null }) => {
  return (
    <div className='flex flex-col items-center gap-8 w-full'>
      {
        games.map((game, index) => {
          return (
            <Suspense key={index} fallback={<p>Loading...</p>}>
              <GameTile key={index} game={game} league={league} />
            </Suspense>)
        })
      }
    </div>
  )
}

export default GamesList