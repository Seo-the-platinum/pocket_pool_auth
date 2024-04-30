'use client'
import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'

const CreatePoolButton = ({ event, league }: { event: string, league: string, }) => {
  const [size, setSize] = useState<25 | 100>(100)
  const [pricePerSquare, setPrice] = useState('')
  const [payouts, setPayouts] = useState(['', '', '', ''])


  const router = useRouter()
  const createPool = api.pool.create.useMutation({
    onSuccess: (pool) => {
      router.push(`/pools/${pool.id}`)
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sport = league === 'nba' ? 'basketball' : 'football'
    createPool.mutate({ size, event, league, sport, pricePerSquare: Number(pricePerSquare), payouts: payouts.map(payout => Number(payout)) });
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
    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor='pricePerSquare'>Price Per Square</label>
          <input
            className='input'
            id='pricePerSquare'
            onChange={handlePriceChange}
            type='number'
            pattern="[0-9]+"
            value={pricePerSquare}
          />
        </div>
        {
          payouts.map((payout, index) => {
            return (
              <div className='flex flex-col gap-2' key={index}>
                <label htmlFor={`quarter-${index}`}>Quarter {index + 1} </label>
                <input
                  className='input'
                  id={`quarter-${index + 1}`}
                  onChange={(e) => handlePayouts(e, index)}
                  type='number'
                  pattern="[0-9]+"
                  value={payout}
                />
              </div>
            )
          })
        }
      </div>
      <button className='btn' type='submit'>
        Create Pool
      </button>
    </form>
  )
}

export default CreatePoolButton