import React from 'react'
import type { soldSquares } from '../types/pool'

const PendingList = ({ squares }: soldSquares) => {
  const hash: Record<string, number[]> = {
  }
  squares.forEach((square) => {
    if (!hash[square.name]) {
      hash[square.name] = []
    }
    hash[square.name]?.push(square.number)
  })

  return (
    <div>
      {
        Object.keys(hash).map((name) => (
          <div className='flex flex-col divide-y-2' key={name}>
            <h1>{name} </h1>
            <ul className='flex gap-1'>
              {
                hash[name]?.map((number) => (
                  <li key={number}>{number},</li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  )
}

export default PendingList