'use client'
import React, { useState } from 'react'
import MemoSquare from './square'
import type { RouterOutputs } from '~/trpc/shared'
import { api } from '~/trpc/react'
import Team from './team-label'

type Pool = RouterOutputs['pool']['getPoolById'] & {
  session: string | undefined, away: {
    id: string,
    name: string,
    logo: string
  },
  home: {
    id: string,
    name: string,
    logo: string
  },
}

//Might need the square type later
// type Square = RouterOutputs['square']['updateSquare'] & {
//   isSelected: boolean
// }


const PoolContainer = (props: Pool) => {
  const { id, userId, session, away, home } = props
  const squares = props.squares.map((square) => {
    return {
      ...square,
      isSelected: false
    }
  })
  const [x, setX] = useState(props.x)
  const [y, setY] = useState(props.y)
  const [top, setTop] = useState(props.top)
  const [left, setLeft] = useState(props.left)
  const [availableSquares, setSquare] = useState(squares)
  const [signiture, setSigniture] = useState('')

  const updateSquares = api.square.updateSquares.useMutation({
    onSuccess: () => {
      setSquare(prev => {
        return prev.map((square) => {

          if (square.isSelected) {
            return {
              ...square,
              name: signiture,
            }
          }
          return square
        })
      })
      setSigniture('')

      console.log('success')
    }
  })
  const squareValues = api.square.addSquareValues.useMutation({
    onSuccess: () => {
      console.log('success')
    }
  })

  const { mutate, variables } = api.pool.addValues.useMutation({
    onSuccess: () => {
      if (variables) {
        squareValues.mutate({
          poolId: props.id,
          x: variables.x,
          y: variables.y
        })
      }
      console.log('success')
    }
  })

  const addTeams = api.pool.addTeams.useMutation({
    onSettled: (data) => {
      if (data) {
        setTop(data.top)
        setLeft(data.left)
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!signiture || signiture.length < 1) {
      return
    }
    const selectedSquares = availableSquares.filter((square) => {
      if (square.isSelected) {
        return square
      }
    }).map((square) => square.id)
    updateSquares.mutate({ name: signiture, ids: selectedSquares, status: 'pending', userId: userId })
  }

  const drawNumbers = () => {
    const vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const xArr = [...vals].sort(() => Math.random() - 0.5)
    const yArr = [...vals].sort(() => Math.random() - 0.5)
    mutate({
      id: id,
      x: xArr,
      y: yArr
    })
  }

  const drawTeams = () => {
    const vals = ['away', 'home'].sort(() => Math.random() - 0.5)
    addTeams.mutate({
      id: id,
      top: vals[0]!,
      left: vals[1]!,
    })
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="border-2 rounded-md border-black grid grid-cols-10 grid-rows-10 relative">
        <div className="flex flex-col w-full absolute bottom-[102%] gap-2">
          {top && <Team team={top === 'home' ? home : away} position={'top'} />}
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
            {left && <Team team={left === 'home' ? home : away} position={'left'} />}
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
        session === userId && x.length < 1 && y.length < 1 && (!variables) &&
        <button onClick={drawNumbers}>Draw Numbers</button>
      }
      {
        session === userId && !top && !left && <button onClick={drawTeams}>Draw Teams</button>
      }
    </div >
  )
}

export default PoolContainer