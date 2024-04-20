import React from 'react'
import type { SoldSquares } from '../types/pool'

const PendingList = ({ squares }: SoldSquares) => {
  const hash: Record<string, number[]> = {
  }
  squares.forEach((square) => {
    if (!hash[square.name]) {
      hash[square.name] = []
    }
    hash[square.name]?.push(square.number)
  })

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Pending & Sold Squares</h1>
      <div className='flex flex-col gap-2'>
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
    </div>
  )
}

export default PendingList