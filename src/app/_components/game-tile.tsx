import React from 'react'
import { useQuery } from '@tanstack/react-query'

const GameTile = ({ game }) => {
  const { data } = useQuery(['game', game.id], async ({ queryKey }) => {
    const [_, gameId] = queryKey
    const response = await fetch(`${game.$ref}`)
    return response.json()
  }
  )
  console.log(data?.competitions[0].competitors[0].team.$ref)
  return (
    <div>GameTile</div>
  )
}

export default GameTile