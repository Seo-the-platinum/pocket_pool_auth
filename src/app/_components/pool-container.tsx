'use client'
import React, { useState } from 'react'
import MemoSquare from './square'
import type { RouterOutputs } from '~/trpc/shared'
import { api } from '~/trpc/react'

type Pool = RouterOutputs['pool']['getPoolById'] & { session: string | undefined }
type Square = RouterOutputs['square']['updateSquare'] & {
  isSelected: boolean
}
const PoolContainer = (props: Pool) => {
  const requestSquares = api.square.updateSquares.useMutation({
    onSuccess: () => {
      console.log('success')
    }
  })
  const squares = props.squares.map((square) => {
    return {
      ...square,
      isSelected: false
    }
  })

  const [availableSquares, setSquare] = useState<Square[]>(squares)
  const [signiture, setSigniture] = useState<string>('')
  const { userId, x, y, top, left, session } = props
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedSquares = availableSquares.filter((square) => {
      if (square.isSelected) {
        return square
      }
    }).map((square) => {
      return {
        ...square,
        userId: userId,
        name: signiture,
      }
    })
    requestSquares.mutate(selectedSquares)
  }
  const shuffle = () => {
    console.log('shuffle')
  }
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="border-2 rounded-md border-black grid grid-cols-10 grid-rows-10 relative">
        <div className="flex flex-col w-full absolute bottom-[102%]">
          <div className='w-full text-center'>
            {top && top}
          </div>
          <div className="grid grid-cols-10">
            {
              x.map((x, i) => {
                return (
                  <p key={i}>{i}</p>
                )
              }
              )
            }
          </div>
        </div>
        <div className="absolute right-[102%] h-full flex">
          <div className="h-full flex items-center">
            <p style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>
              {left && left}
            </p>
          </div>
          <div className="grid grid-rows-10">
            {
              y.map((_, i) => {
                return (
                  <p key={i}>{i}</p>
                )
              }
              )
            }
          </div>
        </div>
        {
          availableSquares?.map((square) => {
            return (
              <MemoSquare key={square.id} {...square} setSquare={setSquare} />
            )
          })
        }
      </div>
      <form className='w-full flex justify-evenly' onSubmit={handleSubmit}>
        <input
          className='pl-2 ring-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
          type="text"
          placeholder="Name"
          value={signiture}
          onChange={(e) => setSigniture(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Submit
        </button>
      </form>
      {
        session === userId && <button onClick={shuffle}>Shuffle</button>
      }
    </div>
  )
}

export default PoolContainer