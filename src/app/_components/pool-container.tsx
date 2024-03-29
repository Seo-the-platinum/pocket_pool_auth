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
  const { mutate, variables } = api.pool.addValues.useMutation({
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
  const { id, userId, x, y, top, left, session } = props
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
    const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const xArr = [...vals].sort(() => Math.random() - 0.5)
    const yArr = [...vals].sort(() => Math.random() - 0.5)
    mutate({
      id: id,
      x: xArr,
      y: yArr
    })
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
              y.length > 0 ? y.map((y, i) => {
                return (
                  <p key={i}>{y}</p>
                )
              }
              ) :
                variables && variables.y.length > 0 ? variables.y.map((y, i) => {
                  return (
                    <p key={i}>{y}</p>
                  )
                }
                ) :
                  null
            }
          </div>
        </div>
        <div className="absolute right-[102%] h-full flex">
          <div className="h-full flex-col items-center">
            <p style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>
              {left && left}
            </p>
          </div>
          <div className="grid grid-rows-10">
            {
              x.length > 0 ? x.map((x, i) => {
                return (
                  <p key={i}>{x}</p>
                )
              }
              ) :
                variables && variables.x.length > 0 ? variables.x.map((x, i) => {
                  return (
                    <p key={i}>{x}</p>
                  )
                }
                ) :
                  null
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
        session === userId && x.length < 1 && y.length < 1 && <button onClick={shuffle}>Shuffle</button>
      }
    </div >
  )
}

export default PoolContainer