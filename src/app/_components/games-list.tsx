import React from 'react'
import GameTile from './game-tile'

const GamesList = (props) => {
  console.log(props)
  return (
    <div>
      {
        props.games.map((game, index) => {
          return <GameTile key={index} game={game} />
        })
      }
    </div>
  )
}

export default GamesList