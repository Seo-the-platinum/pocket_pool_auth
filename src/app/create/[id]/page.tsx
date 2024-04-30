import React from 'react'
import Image from 'next/image'
import CreatePoolButton from '~/app/_components/create-pool-button'
import { formatDate } from '~/app/utils/FormatDate'

type GameType = {
  boxscore: {
    teams: [
      {
        team: {
          name: string
          logo: string
        }
      },
      {
        team: {
          name: string
          logo: string
        }
      }
    ]
  },
  header: {
    league: {
      slug: string
    }
    competitions: [
      {
        date: Date
      }
    ]
  }
}

const Create = async ({ params }: { params: { id: string } }) => {
  const game = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${params.id}`)
  const gameData = await game.json() as GameType
  const away = gameData.boxscore.teams[0].team
  const home = gameData.boxscore.teams[1].team
  const league = gameData.header.league.slug
  const date = formatDate(gameData.header.competitions[0].date)
  return (
    <div className='flex flex-col items-center px-4 gap-4 pt-16'>
      <div className="flex flex-col text-center text-bold text-xl border-2 rounded-lg border-slate-950 w-full bg-slate-200 dark:bg-slate-700">
        <div className="flex justify-around">
          <Image src={away.logo} width={100} height={100} alt={away.name} />
          <p className='self-center text-5xl'>@</p>
          <Image src={home.logo} width={100} height={100} alt={home.name} />
        </div>
        <p>{date}</p>
      </div>
      <CreatePoolButton event={params.id} league={league} />
    </div>
  )
}

export default Create