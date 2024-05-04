import React from 'react'
import type { SoldSquares } from '../types/pool'

const PendingList = ({ squares, setUser }: SoldSquares) => {
  const hash: Record<string, number[]> = {
  }
  squares.forEach((square) => {
    if (!hash[square.name?.toLowerCase()] && square.name !== null && square.name.length > 0) {
      hash[square.name.toLowerCase()] = []
    }
    hash[square.name?.toLowerCase()]?.push(square.number)
  })

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Pending & Sold Squares</h1>
      <div className='flex flex-col gap-2'>
        {
          Object.keys(hash).sort().map((name) => (
            <div className='flex flex-col divide-y-2 gap-2' key={name}>
              <button className='btn w-20 h-8 overflow-ellipsis overflow-hidden' onClick={() => setUser(name)}>{name} </button>
              <ul className='flex gap-1 flex-wrap'>
                {
                  hash[name]?.map((number) => (
                    <li key={number}>{number}</li>
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