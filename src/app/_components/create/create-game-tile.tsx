'use client'
import React from 'react'
import Image from 'next/image'
import type { CreateTile } from '~/app/types/event'

const CreateGameTile = ({ away, home, dateString }: CreateTile) => {
  return (
    <div className="gameTile pointer-events-none">
      <div className="flex justify-around">
        <Image src={away.logo} width={100} height={100} alt={away.name} />
        <p className='self-center text-5xl'>@</p>
        <Image src={home.logo} width={100} height={100} alt={home.name} />
      </div>
      <p>{dateString}</p>
    </div>
  )
}

export default CreateGameTile