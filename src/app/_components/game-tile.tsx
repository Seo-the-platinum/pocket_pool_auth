import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

type EventData = {
  competitions: [
    {
      competitors: [
        {
          team: {
            $ref: string
          }
        },
        {
          team: {
            $ref: string
          }
        }
      ],
      status: {
        $ref: string
      }
    }
  ],
  id: string
}

type StatusType = {
  type: {
    description: string
  }
}

type TeamData = {
  name: string
  logos: [
    {
      href: string
    }
  ]
}

const GameTile = ({ game }: { game: { $ref: string } }) => {
  const { data, isLoading } = useQuery(['game', game.$ref], async (): Promise<[EventData, TeamData, TeamData, StatusType] | null> => {
    const gameRef = `https${game.$ref.slice(4)}`
    const response = await fetch(gameRef)
    const eventData = await response.json() as EventData
    const statusRef = `https${eventData.competitions[0].status.$ref.slice(4)}`
    const eventStatus = await fetch(statusRef)
    const statusData = await eventStatus.json() as StatusType

    if (statusData.type.description === 'Scheduled') {
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

  return (
    <Link className='flex justify-around border-2 border-slate-900 rounded-md w-[90%] bg-slate-200' href={`/create/${data[0]?.id}`}>
      <Image src={data[2].logos[0].href} width={100} height={100} alt={`${data[2].name} team logo`} />
      <Image src={data[1].logos[0].href} width={100} height={100} alt={`${data[1].name} team logo`} />
    </Link>
  )
}

export default GameTile