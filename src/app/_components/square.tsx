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
  const winner = winners?.some(quarter => quarter.x === x && quarter.y === y)
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
  const squareStyles = `
  ${poolStatus === 'closed' ? (winner ? 'bg-amber-200' : (currentWinner ? 'bg-red-500' : 'bg-slate-300')) :
      (status === 'open' ? 'bg-emerald-400' : (status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'))} 
   size-[28px] flex flex-col overflow-hidden sm:size-14 lg:size-20 border-[1px] border-black
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