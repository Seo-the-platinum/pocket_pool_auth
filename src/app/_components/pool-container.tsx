'use client'
import React, { useState } from 'react'
import MemoSquare from './square'
import type { RouterOutputs } from '~/trpc/shared'
import { api } from '~/trpc/react'
import Team from './team-label'


type quarter = {
  away: number;
  home: number;
  period: number;
}

type Pool = RouterOutputs['pool']['getPoolById'] & {
  session: string | undefined, away: {
    id: string,
    name: string,
    logo: string
    score: number | null | undefined
  },
  home: {
    id: string,
    name: string,
    logo: string
    score: number | null | undefined
  },
  quarters: quarter[] | undefined
}

const PoolContainer = (props: Pool) => {
  const { id, userId, session, away, home, x, y, quarters } = props
  const squares = props.squares.map((square) => {
    return {
      ...square,
      isSelected: false
    }
  })

  const [top, setTop] = useState(props.top)
  const [left, setLeft] = useState(props.left)
  const [availableSquares, setSquare] = useState(squares)
  const [signiture, setSigniture] = useState('')
  const [status, setStatus] = useState(props.status)

  //TRPC PROCEDURES

  const closePool = api.pool.closePool.useMutation({
    onSuccess: () => {
      setStatus('closed')
    }
  })
  const adminUpdateSquares = api.square.adminUpdateSquares.useMutation({
    onSuccess: (data) => {
      const dataMap = new Map(data.map((square) => [square.id, square]))
      setSquare(prev => {
        return prev.map((square) => {
          if (dataMap.has(square.id)) {
            return {
              ...square,
              ...dataMap.get(square.id)
            }
          }
          return square
        })
      })
      console.log('success')
    }
  })
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

  const adminUpdate = () => {
    const selectedSquares = availableSquares.filter((square) => {
      if (square.isSelected) {
        return square
      }
    }
    ).map((square) => {
      return {
        id: square.id,
        status: square.status,
        name: square.status === 'open' ? '' : square.name ? square.name : signiture,
        userId: square.status !== 'open' && square.userId ? square.userId : undefined
      }
    }
    )
    adminUpdateSquares.mutate(selectedSquares)
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
  const currentWinner = {
    x: left === 'away' ? away.score && away.score % 10 : home.score && home.score % 10,
    y: top === 'away' ? away.score && away.score % 10 : home.score && home.score % 10
  }
  const winners = quarters?.map((quarter) => {
    return {
      x: left === 'away' ? quarter.away % 10 : quarter.home % 10,
      y: top === 'away' ? quarter.away % 10 : quarter.home % 10,
      period: quarter.period
    }
  })

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
              <MemoSquare
                key={square.id}
                {...square}
                setSquare={setSquare}
                admin={session === userId}
                currentWinner={square.x === currentWinner.x && square.y === currentWinner.y}
                winners={winners}
                poolStatus={status}
              />
            )
          })
        }
      </div>
      {
        status === 'open' &&
        <>
          <form className='w-full flex justify-evenly' onSubmit={handleSubmit}>
            <input
              className='pl-2 ring-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              type="text"
              placeholder="Name"
              value={signiture}
              onChange={(e) => setSigniture(e.target.value)} />
            <button type="submit" className="btn">
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
          {
            session === userId && <button className="btn" onClick={adminUpdate}>Update Squares</button>
          }
          {
            session === userId && <button className='btn' onClick={() => {
              closePool.mutate({ id: id })
            }}>Close Pool</button>
          }
        </>

      }
    </div >
  )
}

export default PoolContainer