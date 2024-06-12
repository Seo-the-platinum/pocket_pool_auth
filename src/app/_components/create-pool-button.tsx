'use client'
import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading } from "react-icons/ai";

const CreatePoolButton = ({ event, league }: { event: string, league: string, }) => {
  const [pricePerSquare, setPrice] = useState('')
  const [payouts, setPayouts] = useState(['', '', '', ''])
  const [open, setOpen] = useState('')

  const router = useRouter()
  const createPool = api.pool.create.useMutation({
    onSuccess: (pool) => {
      router.push(`/pools/${pool.id}`)
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sport = league === 'nba' ? 'basketball' : 'football'
    createPool.mutate({
      size: 100,
      event,
      league,
      sport,
      pricePerSquare: Number(pricePerSquare),
      payouts: payouts.map(payout => Number(payout)),
      openDate: open.length > 1 ? new Date(open).toISOString() : undefined,
    });
  }

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPrice(value)
  }

  const handlePayouts = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const payoutsCopy = [...payouts]
    payoutsCopy[index] = e.target.value
    setPayouts(payoutsCopy)
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor='pricePerSquare'>Price Per Square</label>
          <input
            className='input'
            id='pricePerSquare'
            onChange={handlePriceChange}
            type='number'
            pattern="[0-9]+"
            min={0}
            value={pricePerSquare}
            required
          />
        </div>
        {
          payouts.map((payout, index) => {
            return (
              <div className='flex flex-col gap-2' key={index}>
                <label htmlFor={`quarter-${index + 1}`}>Quarter {index + 1} </label>
                <input
                  className='input'
                  id={`quarter-${index + 1}`}
                  onChange={(e) => handlePayouts(e, index)}
                  type='number'
                  min={0}
                  pattern="[0-9]+"
                  value={payout}
                  required
                />
              </div>
            )
          })
        }
        <label>Pool Open Date & Time </label>
        <input
          className='input'
          type='datetime-local'
          value={open}
          onChange={(e) => setOpen(e.target.value)} />
      </div>
      {
        createPool.isLoading ? <button className='btn' disabled><AiOutlineLoading className='animate-spin' /></button> :
          <button className='btn' type='submit'>
            Create Pool
          </button>

      }
    </form>
  )
}

export default CreatePoolButton