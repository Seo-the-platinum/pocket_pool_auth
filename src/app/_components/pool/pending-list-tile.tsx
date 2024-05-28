'use client'
import React, { useState } from 'react'
import type { PendingListTileProps } from '~/app/types/pool'

const PendingListTile = ({ name, styles, hash, allSold, allReset, pricePerSquare, userHighlight }: PendingListTileProps) => {
  const [open, setOpen] = useState(false)
  const handleShow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(!open)
  }
  return (
    <div className='flex flex-col gap-2 rounded-md shadow-lg shadow-slate-700 p-2 dark:bg-slate-950 ring-2 dark:ring-sky-700 brightness-110' key={name} onClick={() => userHighlight(name)}>
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <p>{name}</p>
          <h1 className='text-xl'>{`- ${hash[name]?.length}`}</h1>
        </div>
        <p>{`Total: $${(Number(hash[name]?.length) * pricePerSquare).toFixed(2)}`}</p>
      </div>
      <button className='btn w-max self-center' onClick={(e) => handleShow(e)}>{open ? 'Hide Squares' : 'Show Squares'}</button>
      <div className={`${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} w-full grid transition-all ease-in-out duration-500 overflow-hidden`}>
        <div className=' flex flex-col overflow-y-hidden'>
          <ul className='flex flex-wrap gap-1'>
            {
              hash[name]?.map((square) => (
                <li className={`${styles[square.period]}`} key={square.number}>{square.number}</li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly">
        <button className='btn' onClick={(e) => allSold(e, name)}>Mark All Sold</button>
        <button className='btn' onClick={(e) => allReset(e, name)}>Reset All</button>
      </div>
    </div>
  )
}

export default PendingListTile