'use client'
import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '~/trpc/react'
import { redirect, useRouter } from 'next/navigation'

const CreatePoolButton = ({ event }: { event: string }) => {
  const [size, setSize] = useState<25 | 100>(25)
  const router = useRouter()
  const createPool = api.pool.create.useMutation({
    onSuccess: () => {
      // router.refresh('/');
      // setName("");
      router.push('/')
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPool.mutate({ size, event });
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