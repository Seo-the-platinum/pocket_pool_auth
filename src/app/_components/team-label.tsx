import React from 'react'
import Image from 'next/image'

const Team = ({ team, position }: { team: { id: string, logo: string, name: string }, position: string }) => {
  return (
    <div className={`${position === 'top' ? 'items-center' : 'justify-center gap-4'} flex flex-col text-xl`}>
      <Image src={team.logo} alt={`${team.name}'s logo`} width={32} height={32} />
      <p style={position === 'left' ? { writingMode: 'vertical-lr', textOrientation: 'upright' } : {}}>{team.name}</p>
    </div >
  )
}

export default Team