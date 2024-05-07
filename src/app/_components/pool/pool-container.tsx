'use client'
import React, { useState } from 'react'
import MemoSquare from './square'
import PendingList from '../pending-list'
import { api } from '~/trpc/react'
import Team from '../team-label'
import type { ExtendedPools } from '../../types/pool'
import type { SoldSquare } from '../../types/pool'
import { adminSquares, userSquares } from '../../utils/PoolHelpers'
import { AiOutlineLoading } from "react-icons/ai";
import { FaCopy, FaCheck } from "react-icons/fa";
import { usePathname } from 'next/navigation'

const PoolContainer = ({ id, userId, session, away, home, x, y, quarters, top, left, squares, status, pricePerSquare }: ExtendedPools) => {
  const [topState, setTop] = useState(top)
  const [leftState, setLeft] = useState(left)
  const [availableSquares, setSquare] = useState(squares.map((square) => { return { ...square, isSelected: false } }))
  const [signiture, setSigniture] = useState('')
  const [statusState, setStatus] = useState(status)
  const [selectedUser, setUser] = useState('')
  const [copied, setCopied] = useState(false)
  const path = usePathname()
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
              ...dataMap.get(square.id),
              isSelected: false
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
              isSelected: false,
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
          poolId: id,
          x: variables.x,
          y: variables.y
        })
      }
      console.log('success')
    }
  })

  // POOL UPDATE FUNTIONS

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
    const selectedSquares = userSquares(availableSquares)
    updateSquares.mutate({ name: signiture, ids: selectedSquares, status: 'pending', userId: userId })
  }

  const adminUpdate = () => {
    const selectedSquares = adminSquares(availableSquares, signiture)
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
    x: leftState === 'away' ? away.score && away.score % 10 : home.score && home.score % 10,
    y: topState === 'away' ? away.score && away.score % 10 : home.score && home.score % 10
  }
  const winners = quarters?.map((quarter) => {
    return {
      x: leftState === 'away' ? quarter.away % 10 : quarter.home % 10,
      y: topState === 'away' ? quarter.away % 10 : quarter.home % 10,
      period: quarter.period
    }
  })
  const unsold = squares.some((square) => square.status !== 'sold')
  const handleCopy = async () => {
    await navigator.clipboard.writeText(path)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center gap-8" id='pool-container'>
      <div className="rounded-md grid grid-cols-10 grid-rows-10 relative text-slate-950 dark:text-slate-300 bg-transparent">
        <div className="flex flex-col w-full absolute bottom-[102%] gap-2">
          {topState && <Team team={topState === 'home' ? home : away} position={'top'} />}
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
          <div className="h-full flex-col flex justify-center">
            {leftState && <Team team={leftState === 'home' ? home : away} position={'left'} />}
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
                currentWinner={(square.x !== null && square.x === currentWinner.x) && (square.y !== null && square.y === currentWinner.y)}
                winners={winners}
                poolStatus={statusState}
                selectedUser={selectedUser}
              />
            )
          })
        }
      </div>
      {
        status === 'open' &&
        <>
          <div className="flex gap-4">
            <p>{`Total Squares: ${userSquares(availableSquares).length}`}</p>
            <p>{`Total Value: $${(userSquares(availableSquares).length * Number(pricePerSquare)).toFixed(2)}`}</p>
          </div>
          <form className='w-full flex justify-evenly gap-4' onSubmit={handleSubmit}>
            <input
              className='pl-2 ring-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400'
              type="text"
              placeholder="Name"
              value={signiture}
              onChange={(e) => setSigniture(e.target.value.trimEnd())} />
            {
              updateSquares.isLoading ? <button className='btn' disabled>
                <AiOutlineLoading className='animate-spin' />
              </button> :
                <button type="submit" className="btn">
                  Submit
                </button>
            }
          </form>
          {
            session === userId &&
            <>
              {
                x.length < 1 && y.length < 1 && unsold === false && (!variables) &&
                <button onClick={drawNumbers}>Draw Numbers</button>
              }
              {
                !top && !left && unsold === false && <button onClick={drawTeams}>Draw Teams</button>
              }
              {
                unsold === false && status === 'open' && <button onClick={() => {
                  closePool.mutate({ id: id })
                }}>Close Pool</button>
              }
              {
                adminUpdateSquares.isLoading ?
                  <button className='btn' disabled>
                    <AiOutlineLoading className='animate-spin' />
                  </button> :
                  <button className="btn" onClick={adminUpdate}>Update</button>
              }
              <button className='btn min-w-fit gap-2' onClick={handleCopy}>{
                !copied ? <>
                  <p>Copy to Clipboard</p> <FaCopy /></> :
                  <><p>Copied</p><FaCheck /></>}
              </button>
            </>
          }
        </>
      }
      <PendingList squares={availableSquares as SoldSquare[]} setUser={setUser} winners={winners} pricePerSquare={Number(pricePerSquare)} />
    </div >
  )
}

export default PoolContainer