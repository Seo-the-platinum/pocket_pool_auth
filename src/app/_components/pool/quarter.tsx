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
  const quarterColorCode: Record<number, string> = {
    1: 'bg-gradient-to-br from-amber-800 from-40% via-amber-500 via-50% to-amber-800 to-65% border-2 border-slate-900',
    2: 'bg-gradient-to-br from-slate-400 from-40% via-slate-100 via-50% to-slate-400 to-65% border-2 border-slate-900',
    3: 'bg-gradient-to-br from-yellow-700 from-40% via-yellow-200 via-50% to-yellow-700 to-65% border-2 border-slate-900',
    4: 'bg-gradient-to-br from-gray-700 from-40% via-gray-300 via-50% to-gray-700 to-65% border-2 border-slate-900',
  }
  return (
    <div className={`${quarterColorCode[q.period]} flex flex-col text-xs items-center rounded-md min-w-16`}>
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