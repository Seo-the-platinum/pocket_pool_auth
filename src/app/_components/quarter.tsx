import React from 'react'
import Image from 'next/image'

type Quarter = {
  awayScore: number,
  homeScore: number,
  awayLogo: string,
  homeLogo: string,
  period: number,
  awayName: string,
  homeName: string
}

const Quarter = ({ quarter: q }: { quarter: Quarter }) => {
  return (
    <div className='flex flex-col text-xs'>
      <p className='text-xl'>{`Q${q.period}`}</p>
      <Image src={q.awayLogo} width={24} height={24} alt={`${q.awayName}'s logo`} />
      <p>{q.awayName}</p>
      <p>{q.awayScore}</p>
      <Image src={q.homeLogo} width={24} height={24} alt={`${q.homeName}'s logo`} />
      <p>{q.homeName}</p>
      <p>{q.homeScore}</p>
    </div>
  )
}

export default Quarter