import React from 'react'
import type { SoldSquares, SoldSquareWithWinner } from '../types/pool'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const PendingList = ({ squares, setUser, winners, pricePerSquare, selectedUser }: SoldSquares) => {
  const router = useRouter()
  const pathname = usePathname()
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
  const handleUserHighlight = (name: string) => {
    if (name === selectedUser) {
      setUser('')
      return
    }
    setUser(name)
    router.push(`${pathname}/#pool-container`)
  }
  return (
    <div className='flex flex-col gap-4 w-full text-center'>
      <h1 className='text-2xl font-bold'>Pending & Sold Squares</h1>
      <div className='flex flex-col gap-8'>
        {
          Object.keys(hash).sort().map((name) => (
            <div className='flex flex-col gap-2 rounded-md shadow-lg shadow-slate-700 p-2 dark:bg-slate-950 ring-2 dark:ring-sky-700 brightness-110' key={name} onClick={() => handleUserHighlight(name)}>
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <p>{name}</p>
                  <h1 className='text-xl'>{`- ${hash[name]?.length}`}</h1>
                </div>
                <p>{`Total: $${(Number(hash[name]?.length) * pricePerSquare).toFixed(2)}`}</p>
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