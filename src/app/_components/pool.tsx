'use client'
import React, { useState } from 'react'
import MemoSquare from './square'
import type { RouterOutputs } from '~/trpc/shared'

type Pool = RouterOutputs['pool']['getPoolById']
type Square = RouterOutputs['square']['updateSquares'] & {
  isSelected: boolean
}
const PoolContainer = (props: Pool) => {
  const squares = props!.squares.map((square) => {
    return {
      ...square,
      isSelected: false
    }
  })
  const [availableSquares, setSquare] = useState<Square[]>(squares)
  const { id } = props!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedSquares = availableSquares.filter((square) => square.isSelected)
    console.log(selectedSquares)
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="border-2 rounded border-black grid grid-cols-10 grid-rows-10">
        {
          availableSquares?.map((square) => {
            return (
              <MemoSquare key={square.id} {...square} setSquare={setSquare} />
            )
          })
        }
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PoolContainer