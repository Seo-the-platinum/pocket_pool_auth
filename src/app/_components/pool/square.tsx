'use client'
import React from 'react'
import type { RouterOutputs } from '~/trpc/shared'
import Link from 'next/link'

type quarter = {
  x: number;
  y: number;
  period: number;
}

// type ModifiedSquare = RouterOutputs['square']['updateSquare'] & {
//   isSelected: boolean
// }
type Square = RouterOutputs['square']['updateSquare'] & {
  isSelected: boolean
  // admin: boolean
  currentWinner: boolean
  poolStatus: string
  winners: quarter[] | undefined
  // setSquare: React.Dispatch<React.SetStateAction<ModifiedSquare[]>>
  selectedUser: string
  // poolOpen: boolean | null
  toggle: (id: string) => void
}

const Square = (props: Square) => {
  const { number, id, name, status, currentWinner, poolStatus, winners, x, y, isSelected, selectedUser, toggle } = props
  const winner = winners?.find(quarter => quarter.x === x && quarter.y === y)
  const winning = winners?.filter(quarter => quarter.x === x && quarter.y === y).map(quarter => quarter.period)

  const winnerColors: Record<number, string> = {
    1: 'bg-gradient-to-br from-amber-500 from-5% via-amber-700 via-50% to-amber-500 to-95% border-2 border-slate-900 scale-125',
    2: 'bg-gradient-to-br from-slate-100 from-5% via-slate-500 via-50% to-slate-100 to-95% border-2 border-slate-900 scale-125',
    3: 'bg-gradient-to-br from-yellow-200 from-5% via-yellow-700 via-50% to-yellow-200 to-95% border-2 border-slate-900 scale-125',
    4: 'bg-gradient-to-br from-gray-300 from-1% via-gray-600 via-50% to-gray-300 to-99% border-2 border-slate-900 scale-125',
    5: 'bg-gradient-to-br from-sky-200 from-40% via-sky-400 via-50% to-sky-200 to-65% border-2 border-sky-400 scale-125 brightness-125',
  }

  const squareStyles = `
  ${selectedUser.length && selectedUser === name?.toLocaleLowerCase() ? 'bg-teal-400' :
      poolStatus === 'closed' ? (winning?.length && winning.length > 1 ? winnerColors[5] :
        winner ? winnerColors[winner.period] :
          (currentWinner ? 'bg-sky-500 animate-grow' :
            'bg-slate-300 dark:bg-slate-100')) :
        isSelected && status === 'pending' ? 'bg-emerald-500' :
          (status === 'open' ? 'bg-sky-500' :
            (status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'))}
   size-[28px] flex flex-col overflow-hidden sm:size-14 lg:size-20 border-[1px] border-black rounded-md text-black cursor-pointer gap-2`;

  return (
    <>
      {
        poolStatus === 'open' ?
          <div
            className={squareStyles}
            onClick={() => toggle(id)}>
            <p className='text-xs self-start'>{number}</p>
            <p className='text-xs text-ellipsis overflow-hidden hidden sm:block sm:text-center'>{name}</p>
          </div> :
          <Link className={squareStyles} href={`/squares/${id}`}>
            <p>{name}</p>
          </Link>
      }
    </>
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
    prev.poolStatus === next.poolStatus &&
    prev.selectedUser === next.selectedUser
})

export default MemoSquare