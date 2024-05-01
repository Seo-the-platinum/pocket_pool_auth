'use client'
import React from 'react'
import type { RouterOutputs } from '~/trpc/shared'

type quarter = {
  x: number;
  y: number;
  period: number;
}

type ModifiedSquare = RouterOutputs['square']['updateSquare'] & {
  isSelected: boolean
}
type Square = RouterOutputs['square']['updateSquare'] & {
  isSelected: boolean
  admin: boolean
  currentWinner: boolean
  poolStatus: string
  winners: quarter[] | undefined
  setSquare: React.Dispatch<React.SetStateAction<ModifiedSquare[]>>
}

const Square = (props: Square) => {
  const { admin, number, id, setSquare, name, status, currentWinner, poolStatus, winners, x, y } = props
  const winner = winners?.find(quarter => quarter.x === x && quarter.y === y)
  const toggle = () => {
    setSquare((prev) => {
      const square = prev.find(square => square.id === id); //check if square exists and store in square variable
      if (square && !square.name && !square.userId) {
        const updatedSquare = { //use spread operator to update square status
          ...square,
          status: square.status === 'open' ? 'pending' : 'open',
          isSelected: !square.isSelected
        }
        return prev.map(prevSquare => (prevSquare.id === id ? updatedSquare : prevSquare)); //go through lists, replace square with matching id with updated square
      }
      if (square && admin) {
        const updatedSquare = { //use spread operator to update square status
          ...square,
          status: square.status === 'open' ? 'pending' : square.status === 'pending' ? 'sold' : 'open',
          isSelected: true,
        }
        return prev.map(prevSquare => (prevSquare.id === id ? updatedSquare : prevSquare))//go through lists, replace square with matching id with updated square
      }
      return prev;
    })
  }
  const winnerColors: Record<number, string> = {
    1: 'bg-gradient-to-br from-amber-500 from-5% via-amber-700 via-50% to-amber-500 to-95% border-2 border-slate-900',
    2: 'bg-gradient-to-br from-slate-100 from-5% via-slate-400 via-50% to-slate-100 to-95% border-2 border-slate-900',
    3: 'bg-gradient-to-br from-yellow-200 from-5% via-yellow-600 via-50% to-yellow-200 to-95% border-2 border-slate-900',
    4: 'bg-gradient-to-br from-gray-300 from-1% via-gray-600 via-50% to-gray-300 to-99% border-2 border-slate-900',
  }
  const squareStyles = `
  ${poolStatus === 'closed' ? (winner ? winnerColors[winner.period] : (currentWinner ? 'bg-emerald-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800')) :
      (status === 'open' ? 'bg-sky-500' : (status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'))} 
   size-[28px] flex flex-col overflow-hidden sm:size-14 lg:size-20 border-[1px] border-black rounded-md text-black
`;
  return (
    <div
      className={squareStyles}
      onClick={toggle}>
      <p className='text-xs self-start'>{number}</p>
      <p className='text-xs text-ellipsis overflow-hidden flex-1 text-center'>{name}</p>
    </div>
  )
}

//MemoSquare wraps Square component to prevent unnecessary re-renders by comparing the previous and next status.
//useMemo and React.memo although are similar, they are different. React.memo is used to prevent unnecessary re-renders of a component, 
//while useMemo is used to prevent unnecessary re-computations of a value.
const MemoSquare = React.memo(Square, (prev, next) => {
  return prev.status === next.status &&
    prev.name === next.name &&
    prev.currentWinner === next.currentWinner &&
    prev.winners === next.winners &&
    prev.poolStatus === next.poolStatus
})

export default MemoSquare