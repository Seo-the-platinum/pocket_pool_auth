import React from 'react'
import Quarter from './quarter'

type Quarters = {
  awayScore: number,
  homeScore: number,
  awayLogo: string,
  homeLogo: string,
  period: number,
  awayName: string,
  homeName: string
}[]

const Quarters = ({ quarters }: { quarters: Quarters }) => {
  return (
    <div className='flex gap-2'>
      {
        quarters.map((quarter) => {
          return <Quarter key={quarter.period} quarter={quarter} />
        })
      }
    </div>
  )
}

export default Quarters