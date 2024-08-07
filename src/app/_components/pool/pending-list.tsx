import React from 'react'
import type { SoldSquares, SoldSquareWithWinner } from '../../types/pool'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import PendingListTile from './pending-list-tile'

const PendingList = ({ squares, setUser, winners, pricePerSquare, selectedUser, setSquare, poolStatus, userId, session }: SoldSquares) => {
  const router = useRouter()
  const pathname = usePathname()
  const hash: Record<string, SoldSquareWithWinner[]> = {
  }
  squares.forEach((square) => {
    if (!hash[square.name?.toLowerCase()] && square.name !== null && square.name?.length > 0) {
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
  const handleAllSold = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) => {
    e.stopPropagation()
    setSquare(prev => {
      return prev.map(square => {
        if (square.name?.toLowerCase() === name) {
          if (square.status === 'pending' || square.status === 'open') {
            return { ...square, status: 'sold', isSelected: true }
          }
        }
        return square
      })
    })
  }

  const handleAllReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) => {
    e.stopPropagation()
    setSquare(prev => {
      return prev.map(square => {
        if (square.name?.toLowerCase() === name) {
          if (square.status === 'sold' || square.status === 'pending') {
            return { ...square, status: 'open', isSelected: true }
          }
        }
        return square
      })
    })
  }

  return (
    <div className='flex flex-col gap-4 w-full text-center'>
      <h1 className='text-2xl font-bold'>Pending & Sold Squares</h1>
      <div className='flex flex-col gap-8'>
        {
          Object.keys(hash).sort().map((name) => (
            <PendingListTile
              userHighlight={handleUserHighlight}
              key={name}
              name={name}
              styles={styles}
              hash={hash}
              allSold={handleAllSold}
              allReset={handleAllReset}
              pricePerSquare={pricePerSquare}
              poolStatus={poolStatus}
              selectedUser={selectedUser}
              editable={session === userId}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PendingList