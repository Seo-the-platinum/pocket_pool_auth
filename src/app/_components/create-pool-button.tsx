'use client'
import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'

const CreatePoolButton = ({ event, league }: { event: string, league: string, }) => {
  const [size, setSize] = useState<25 | 100>(100)
  const router = useRouter()
  const createPool = api.pool.create.useMutation({
    onSuccess: (pool) => {
      router.push(`/pools/${pool.id}`)
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sport = league === 'nba' ? 'basketball' : 'football'
    createPool.mutate({ size, event, league, sport });
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex">
        <label htmlFor='size'> Choose Size:</label>
        <select className='text-slate-900' id='size' name='size' onChange={(event) => setSize(parseInt(event?.target.value) as 25 | 100)}>
          <option value={25} >25</option>
          <option value={100}>100</option>
        </select>
      </div>
      <button className='rounded focus:outline-sky-500 bg-slate-100 border-2 border-slate-950' type='submit'>
        Create Pool
      </button>
    </form>
  )
}

export default CreatePoolButton