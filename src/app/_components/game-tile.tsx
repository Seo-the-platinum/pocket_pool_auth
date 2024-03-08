import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

const GameTile = ({ game }) => {
  const { data, isLoading } = useQuery(['game', game.$ref], async ({ queryKey }) => {
    const response = await fetch(game.$ref)
    const eventData = await response.json()

    const away = await fetch(eventData.competitions[0].competitors[0].team.$ref)
    const awayData = await away.json()
    const home = await fetch(eventData.competitions[0].competitors[1].team.$ref)
    const homeData = await home.json()
    return [awayData, homeData]
  })
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className='flex justify-around border-2 border-slate-900 rounded-md w-[90%] bg-slate-200'>
      <Image src={data[1].logos[0].href} alt={data?.name} width={100} height={100} alt={`${data[1].name} team logo`} />
      <Image src={data[0].logos[0].href} alt={data?.name} width={100} height={100} alt={`${data[0].name} team logo`} />
    </div>
  )
}

export default GameTile