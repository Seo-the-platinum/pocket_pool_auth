'use client'
import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { api } from '~/trpc/react'


const CreatePoolButton = () => {
  const [size, setSize] = useState<25 | 100>(25)
  const createPool = api.pool.create.useMutation({
    onSuccess: () => {
      console.log('pool created successfully!')
      // router.refresh();
      // setName("");
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPool.mutate({ size });
  }
  return (
    <form className="flex" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='size'> Choose Size:</label>
      <select className='text-slate-900' id='size' name='size' onChange={(event) => setSize(parseInt(event?.target.value) as 25 | 100)}>
        <option value={25} >25</option>
        <option value={100}>100</option>
      </select>
      <button type='submit'>
        Create Pool
      </button>
    </form>
  )
}

export default CreatePoolButton