'use client'
import React, { useState } from 'react'
import type { PendingListTileProps } from '~/app/types/pool'

const PendingListTile = ({ name, styles, hash, allSold, allReset, pricePerSquare, userHighlight, poolStatus, selectedUser, editable }: PendingListTileProps) => {
  const [open, setOpen] = useState(false)
  const handleShow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(!open)
  }
  return (
    <div className='flex flex-col gap-2 rounded-md shadow-lg shadow-sky-600 p-4 dark:bg-slate-950 ring-2 dark:ring-sky-700 brightness-110' key={name}>
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <p>{name}</p>
          <h1 className='text-xl'>{`- ${hash[name]?.length}`}</h1>
        </div>
        <p>{`Total: $${(Number(hash[name]?.length) * pricePerSquare).toFixed(2)}`}</p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        {
          poolStatus === 'open' && editable &&
          <div className="flex justify-between sm:gap-4">
            <button className='btn-sm' onClick={(e) => allSold(e, name)}>Mark All Sold</button>
            <button className='btn-sm' onClick={(e) => allReset(e, name)}>Reset All</button>
          </div>
        }
        <div className="flex justify-between sm:gap-4">
          <button className='btn-sm w-max' onClick={(e) => handleShow(e)}>{open ? 'Hide Squares' : 'Show Squares'}</button>
          <button className='btn-sm w-max' onClick={() => userHighlight(name)}>{selectedUser === name ? 'Unhighlight Squares' : 'Highlight Squares'}</button>
        </div>
      </div>
      <div className={`${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} w-full grid transition-all ease-in-out duration-500 overflow-hidden`}>
        <div className=' flex flex-col overflow-y-hidden'>
          <ul className='flex flex-wrap gap-1 justify-center'>
            {
              hash[name]?.map((square) => (
                <li className={`${styles[square.period]}`} key={square.number}>{square.number}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div >
  )
}

export default PendingListTile