import React from 'react'
import GameTile from './game-tile'

const GamesList = (props) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      {
        props.games.map((game, index) => {
          return <GameTile key={index} game={game} />
        })
      }
    </div>
  )
}

export default GamesList