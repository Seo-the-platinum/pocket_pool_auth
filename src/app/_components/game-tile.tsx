import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
const GameTile = ({ game }) => {
  const { data, isLoading } = useQuery(['game', game.$ref], async ({ queryKey }) => {
    const response = await fetch(game.$ref)
    const eventData = await response.json()
    const eventStatus = await fetch(eventData.competitions[0].status.$ref)
    const statusData = await eventStatus.json()
    if (statusData.type.description === 'Scheduled') {
      const away = await fetch(eventData.competitions[0].competitors[0].team.$ref)
      const awayData = await away.json()
      const home = await fetch(eventData.competitions[0].competitors[1].team.$ref)
      const homeData = await home.json()
      return [eventData, awayData, homeData, statusData]
    }
    return null
  })
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;
  return (
    <Link className='flex justify-around border-2 border-slate-900 rounded-md w-[90%] bg-slate-200' href={`/create/${data[0].id}`}>
      <Image src={data[2].logos[0].href} width={100} height={100} alt={`${data[2].name} team logo`} />
      <Image src={data[1].logos[0].href} width={100} height={100} alt={`${data[1].name} team logo`} />
    </Link>
  )
}

export default GameTile