'use client'
import React, { useState } from 'react'
import type { RouterOutputs } from '~/trpc/shared'

type Square = RouterOutputs['square']['updateSquare'] & {
  setSquare: React.Dispatch<React.SetStateAction<RouterOutputs['square']['updateSquare'][]>>
}

const Square = (props: Square) => {
  const { number, id, setSquare, } = props
  const [status, setStatus] = useState(props.status)
  const toggle = () => {
    setSquare((prev) => {
      const square = prev.find(square => square.id === id);
      if (square) {
        const updatedSquare = {
          ...square,
          status: square.status === 'open' ? 'pending' : 'open',
        };

        return prev.map(prevSquare => (prevSquare.id === id ? updatedSquare : prevSquare));
      }
      return prev;
    })
    setStatus((prev) => {
      if (prev === 'open') return 'pending'
      else return 'open'
    })
  }
  return (
    <div
      className={`${status === 'open' ? 'bg-emerald-400' : status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'} border-[1px] size-10 border-black`}
      onClick={toggle}>
      <p className='text-xs'>{number}</p>
    </div >
  )
}

export default Square