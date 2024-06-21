'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const CreateSelect = ({ league }: { league: string | null }) => {
  const router = useRouter()
  const handleOptionClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') return
    router.push(`/create?league=${e.target.value}`)
  }
  return (
    <div className="flex flex-col gap-2 min-w-full sm:min-w-[70%] lg:min-w-[40%]">
      <label>Choose League :</label>
      <select className='input'
        id='league'
        name='league'
        onChange={(e) => handleOptionClick(e)}
        defaultValue={league ? league : ''}>
        <option value='' disabled>
          Select League
        </option>
        <option value='nfl'>
          NFL
        </option>
        <option value='nba'>
          NBA
        </option>
      </select>
    </div>
  )
}

export default CreateSelect