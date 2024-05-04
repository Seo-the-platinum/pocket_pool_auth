import React from 'react'
import type { SoldSquares, SoldSquareWithWinner } from '../types/pool'

const PendingList = ({ squares, setUser, winners }: SoldSquares) => {
  const hash: Record<string, SoldSquareWithWinner[]> = {
  }
  squares.forEach((square) => {
    if (!hash[square.name?.toLowerCase()] && square.name !== null && square.name.length > 0) {
      hash[square.name.toLowerCase()] = []
    }
    // TODO: FIGURE OUT SOLUTION IN THE EVENT A SQUARE WINS MORE THAN ONCE
    const winner = winners?.find(quarter => quarter.x === square.x && quarter.y === square.y)
    hash[square.name?.toLowerCase()]?.push({ ...square, period: winner?.period ? winner.period : 5 })
  })
  const styles: Record<number, string> = {
    1: 'bg-gradient-to-br from-amber-500 from-5% via-amber-700 via-50% to-amber-500 to-95% border-2 border-slate-900 scale-125 rounded-md',
    2: 'bg-gradient-to-br from-slate-100 from-5% via-slate-500 via-50% to-slate-100 to-95% border-2 border-slate-900 scale-125 rounded-md',
    3: 'bg-gradient-to-br from-yellow-200 from-5% via-yellow-700 via-50% to-yellow-200 to-95% border-2 border-slate-900 scale-125 rounded-md',
    4: 'bg-gradient-to-br from-gray-300 from-1% via-gray-600 via-50% to-gray-300 to-99% border-2 border-slate-900 scale-125 rounded-md',
    5: ''
  }
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Pending & Sold Squares</h1>
      <div className='flex flex-col gap-2'>
        {
          Object.keys(hash).sort().map((name) => (
            <div className='flex flex-col divide-y-2 gap-2' key={name}>
              <div className="flex gap-4 items-center">
                <button className='btn w-20 h-8 overflow-ellipsis overflow-hidden' onClick={() => setUser(name)}>{name} </button>
                <h1 className='text-xl'>{`- ${hash[name]?.length}`}</h1>
              </div>
              <ul className='flex gap-1 flex-wrap'>
                {
                  hash[name]?.map((square) => (
                    <li className={`${styles[square.period]}`} key={square.number}>{square.number}</li>
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