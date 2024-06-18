import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

type GameType = {
  boxscore: {
    teams: [
      {
        team: {
          id: string
          name: string
          logo: string
        }
      },
      {
        team: {
          id: string
          name: string
          logo: string
        }
      }
    ]
  },
  plays: [
    {
      awayScore: number
      homeScore: number
    }

  ]
}

const PoolTile = ({ id, event, league, sport }: { id: string, size: number, event: string, league: string, sport: string }) => {
  const { data } = useQuery(['event', event], async () => {
    const data = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/summary?event=${event}`)
    const gameData = await data.json() as GameType
    const away = gameData?.boxscore.teams[0].team
    const home = gameData?.boxscore.teams[1].team
    const homeLogo = `https${home?.logo.slice(5)}`
    const awayLogo = `https${away?.logo.slice(5)}`
    return {
      away,
      home,
      homeLogo,
      awayLogo
    }
  })
  if (!data) {
    return <div>...Loading</div>
  }
  return (
    <Link className='tile' href={`/pools/${id}`}>
      <Image src={data.awayLogo} alt={`${data.away.name} logo`} width={100} height={100} />
      <Image src={data.homeLogo} alt={`${data.home.name} logo`} width={100} height={100} />
    </Link>
  )
}

export default PoolTile