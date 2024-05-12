import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { formatDate } from '../utils/FormatDate'
import type { EventData, StatusType, TeamData } from '../types/event'


const GameTile = ({ game }: { game: { $ref: string } }) => {
  const { data, isLoading } = useQuery(['game', game.$ref], async (): Promise<[EventData, TeamData, TeamData, StatusType] | null> => {
    const gameRef = `https${game.$ref.slice(4)}`
    const response = await fetch(gameRef)
    const eventData = await response.json() as EventData
    if (parseInt(eventData.competitions[0].competitors[0].id) < 0 || parseInt(eventData.competitions[0].competitors[1].id) < 0) return null
    const statusRef = `https${eventData.competitions[0].status.$ref.slice(4)}`
    const eventStatus = await fetch(statusRef)
    const statusData = await eventStatus.json() as StatusType
    if (statusData.type.description === 'Scheduled' && statusData.type.shortDetail !== 'TBD') {
      const awayUrl = `https${eventData.competitions[0].competitors[0].team.$ref.slice(4)}`
      const homeUrl = `https${eventData.competitions[0].competitors[1].team.$ref.slice(4)}`
      const away = await fetch(awayUrl)
      const awayData = await away.json() as TeamData
      const home = await fetch(homeUrl)
      const homeData = await home.json() as TeamData
      return [eventData, awayData, homeData, statusData]
    }
    return null
  })
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const date = formatDate(data[0].competitions[0].date)
  return (
    <Link className='gameTile' href={`/create/${data[0]?.id}`}>
      <div className='flex justify-around'>
        <Image src={data[2].logos[0]?.href} width={100} height={100} alt={`${data[2].name} team logo`} />
        <Image src={data[1].logos[0]?.href} width={100} height={100} alt={`${data[1].name} team logo`} />
      </div>
      <p>{date}</p>
    </Link>
  )
}

export default GameTile