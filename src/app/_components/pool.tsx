'use client'
import React, { useState } from 'react'
import Square from './square'
import type { RouterOutputs } from '~/trpc/shared'

type Pool = RouterOutputs['pool']['getPoolById']
const PoolContainer = (props: Pool) => {
  const { squares } = props!
  const [squareState, setSquare] = useState(squares)
  const { id } = props!

  return (
    <div className="border-2 rounded border-black grid grid-cols-10 grid-rows-10">
      {
        squareState?.map((square) => {
          return (
            <Square key={square.id} {...square} setSquare={setSquare} />
          )
        })
      }
    </div>
  )
}

export default PoolContainer