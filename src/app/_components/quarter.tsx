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
    1: 'bg-gradient-to-br from-amber-500 from-5% via-amber-700 via-50% to-amber-500 to-95% border-2 border-slate-900',
    2: 'bg-gradient-to-br from-slate-100 from-5% via-slate-400 via-50% to-slate-100 to-95% border-2 border-slate-900',
    3: 'bg-gradient-to-br from-yellow-200 from-5% via-yellow-600 via-50% to-yellow-200 to-95% border-2 border-slate-900',
    4: 'bg-gradient-to-br from-gray-200 from-1% via-gray-600 via-50% to-gray-200 to-99% border-2 border-slate-900',
  }
  return (
    <div className={`${quarterColorCode[q.period]} flex flex-col text-xs items-center rounded`}>
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