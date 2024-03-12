import React from 'react'
import Image from 'next/image'
import CreatePoolButton from '~/app/_components/create-pool-button'

const Create = async ({ params }: { params: { id: string } }) => {
  const game = await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${params.id}`)
  const gameData = await game.json()
  const away = gameData.boxscore.teams[0].team
  const home = gameData.boxscore.teams[1].team

  return (
    <div className='flex flex-col items-center px-4 gap-4'>
      <div className="flex justify-around border-2 rounded-lg border-slate-950 w-full bg-slate-100">
        <Image src={away.logo} width={100} height={100} alt={away.name} />
        <p className='self-center text-5xl'>@</p>
        <Image src={home.logo} width={100} height={100} alt={home.name} />
      </div>
      <CreatePoolButton event={params.id} />
    </div>
  )
}

export default Create