import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

const PoolTile = async ({ id, event, league, sport }: { id: string, size: number, event: string, league: string, sport: string }) => {
  const data = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/summary?event=${event}`)
  const gameData = await data.json() as GameType
  const away = gameData?.boxscore.teams[0].team
  const home = gameData?.boxscore.teams[1].team
  const homeLogo = `https${home?.logo.slice(5)}`
  const awayLogo = `https${away?.logo.slice(5)}`

  return (
    <Link className='flex rounded-md border-2 border-slate-950 bg-slate-200 items-center justify-center gap-20' href={`/pools-test/${id}`}>
      <Image src={awayLogo} alt={`${away.name} logo`} width={100} height={100} />
      <Image src={homeLogo} alt={`${home.name} logo`} width={100} height={100} />
    </Link>
  )
}

export default PoolTile