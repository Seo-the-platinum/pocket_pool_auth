'use client'
import React from 'react'
import type { RouterOutputs } from '~/trpc/shared'

type ModifiedSquare = RouterOutputs['square']['updateSquare'] & {
  isSelected: boolean
}
type Square = RouterOutputs['square']['updateSquare'] & {
  isSelected: boolean
  setSquare: React.Dispatch<React.SetStateAction<ModifiedSquare[]>>
}

const Square = (props: Square) => {
  const { number, id, setSquare, name, x, y } = props
  const { status } = props
  const toggle = () => {
    setSquare((prev) => {
      console.log('heres the x and y', x, y)
      const square = prev.find(square => square.id === id); //check if square exists and store in square variable
      if (square && !square.name && !square.userId) {
        const updatedSquare = { //use spread operator to update square status
          ...square,
          status: square.status === 'open' ? 'pending' : 'open',
          isSelected: !square.isSelected
        };

        return prev.map(prevSquare => (prevSquare.id === id ? updatedSquare : prevSquare)); //go through lists, replace square with matching id with updated square
      }
      return prev;
    })
  }
  return (
    <div
      className={`
      ${status === 'open' ? 'bg-emerald-400' : status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'} 
      border-[1px] size-[28px] border-black flex flex-col overflow-hidden sm:size-14 lg:size-20
      `}
      onClick={toggle}>
      <p className='text-xs self-start'>{number}</p>
      <p className='text-xs text-ellipsis overflow-hidden flex-1 text-center'>{name}</p>
    </div>
  )
}

//MemoSquare wraps Square component to prevent unnecessary re-renders by comparing the previous and next status.
//useMemo and React.memo although are similar, they are different. React.memo is used to prevent unnecessary re-renders of a component, 
//while useMemo is used to prevent unnecessary re-computations of a value.
const MemoSquare = React.memo(Square, (prev, next) => prev.status === next.status)

export default MemoSquare